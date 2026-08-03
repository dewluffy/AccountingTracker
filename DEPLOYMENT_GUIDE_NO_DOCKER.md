# คู่มือติดตั้ง AccountingTracker บนเครื่อง Windows (ออฟฟิศ) แบบไม่ใช้ Docker

คู่มือนี้สำหรับกรณีที่ **เครื่องที่รันจริง (เครื่องออฟฟิศ) เป็นคนละเครื่องกับที่เขียนโค้ด**
และไม่ต้องการติดตั้ง Docker จึงต้องติดตั้งส่วนประกอบทีละตัวเอง
(Node.js, ตัวจัดการ process, MySQL, ตัวเสิร์ฟไฟล์หน้าเว็บ) แยกจากกัน

ข้อดีของวิธีนี้เทียบกับ Docker: ไม่ต้องเช็ค virtualization/BIOS, ใช้ RAM น้อยกว่า,
และถ้าตั้งเป็น **Windows Service** (ข้อ 8-9) เครื่องจะรันระบบขึ้นเองตอนบูตได้เลย
**แม้ไม่มีใคร login เข้าเครื่อง** (ข้อนี้ Docker Desktop ทำไม่ได้ง่ายๆ)

ข้อเสีย: ต้องติดตั้งและดูแล component หลายตัวแยกกันเอง (ไม่มี `docker compose down` ทีเดียวจบ)

> **หมายเหตุเรื่อง path**: ตัวอย่างคำสั่งในคู่มือนี้ใช้ path จริงที่ทดสอบไว้แล้วบนเครื่องนี้คือ
> `C:\Users\User01\Desktop\program\Project\AccountingTracker\` — ถ้าเครื่องออฟฟิศจริง
> วางโปรเจกต์ไว้คนละที่ ให้แทนที่ path ในทุกคำสั่งด้วยตำแหน่งจริงที่ใช้ในเครื่องนั้น

---

## สรุปสิ่งที่ต้องติดตั้งบนเครื่อง Windows ที่จะรันจริง

1. **Node.js 20 LTS** (เวอร์ชันเดียวกับที่โปรเจกต์ใช้ตอน build — ดู `Accounting-Tracker-Api/Dockerfile` ใช้ `node:20-slim`) — มากับ `npm` อยู่แล้วในตัว ไม่ต้องติดตั้งแยก
2. **MySQL Server 8.x** (Community Edition) — ตัว database จริง เพราะไม่มี container ให้แล้ว
3. **NSSM** (Non-Sucking Service Manager) — ใช้ห่อคำสั่ง Node ให้กลายเป็น Windows Service
4. สิทธิ์ Administrator บนเครื่องนั้น

ไม่ต้องมี Git ก็ได้ ถ้าจะคัดลอกโค้ดผ่าน USB/แชร์ไฟล์แทน ไม่ต้องติดตั้ง pnpm/serve แยก
(ใช้ `npm` ที่มากับ Node.js และ `npx serve` แทนได้เลย)

---

## 1. เตรียมไฟล์โปรเจกต์

คัดลอกโฟลเดอร์ `AccountingTracker` ทั้งหมดไปไว้ที่เครื่องออฟฟิศ

โครงสร้างที่ควรเห็น:

```
AccountingTracker\
├── Accounting-Tracker-Api\
├── Accounting-Tracker-Fontend\
└── DEPLOYMENT_GUIDE_NO_DOCKER.md   (ไฟล์นี้)
```

---

## 2. ติดตั้ง Node.js

1. ดาวน์โหลด Node.js **20.x LTS** จาก https://nodejs.org/ (เลือกปุ่ม LTS, ไฟล์ `.msi`)
2. รันตัวติดตั้ง กด Next ค่า default ได้เลย (ให้ติ๊ก "Add to PATH" ไว้ — ปกติติ๊กอยู่แล้ว)
3. เปิด PowerShell ใหม่ (สำคัญ — ต้องเปิดหน้าต่างใหม่หลังติดตั้งเพื่อให้ PATH อัปเดต) แล้วเช็ค:

```powershell
node -v
npm -v
```

ต้องได้ `v20.x.x` และเลข npm ตามมาด้วย

> **ถ้า `npm -v` (หรือคำสั่งอื่นที่เป็นสคริปต์ `.ps1`) ขึ้น error**
> `"...cannot be loaded because running scripts is disabled on this system"` —
> เครื่องนี้ตั้งค่า PowerShell Execution Policy เป็น `Restricted` อยู่ (ค่า default ของ
> Windows หลายเครื่อง โดยเฉพาะเครื่องที่ไม่เคยใช้พัฒนาโปรแกรมมาก่อน) แก้ได้โดยเปิด
> PowerShell **แบบ Run as Administrator** แล้วรัน:
>
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
> ```
>
> พิมพ์ `Y` ยืนยันเมื่อถาม แล้วปิด/เปิด PowerShell ใหม่ (ไม่ต้อง Run as Administrator ก็ได้
> หลังจากนี้) ลองรัน `npm -v` อีกครั้ง

---

## 3. ติดตั้ง MySQL Server

1. ดาวน์โหลด **MySQL Community Server** จาก https://dev.mysql.com/downloads/mysql/
   (เลือก MySQL Installer for Windows)
2. ระหว่างติดตั้งเลือก Setup Type = **Server only** (ไม่ต้องลง Workbench ก็ได้ แต่ถ้าอยากมี GUI
   ดูข้อมูลง่ายๆ จะเลือก **Custom** แล้วเพิ่ม MySQL Workbench ด้วยก็ได้)
3. ตอนตั้งค่า Authentication ให้เลือก **Use Strong Password Encryption**
4. ตั้ง **root password** — จดไว้ให้ดี จะใช้ในข้อ 6
5. ปล่อยให้ตั้งเป็น **Windows Service** (ค่า default, ชื่อ service ปกติคือ `MySQL80` หรือ
   `MySQL84` ขึ้นกับเวอร์ชันที่ติดตั้ง) และติ๊ก
   **Start the MySQL Server at System Startup** — สำคัญ เพราะจะได้ไม่ต้องมาสตาร์ทเองทุกครั้ง
6. กด Execute จนจบทุกขั้นตอน

ทดสอบว่าใช้ได้ เปิด PowerShell:

```powershell
mysql -u root -p
```

ใส่รหัสที่ตั้งไว้ ถ้าเข้า prompt `mysql>` ได้แสดงว่าใช้งานได้ (พิมพ์ `exit` เพื่อออก)

> **ถ้าขึ้น error** `"mysql is not recognized as the name of a cmdlet..."` — MySQL Installer
> ไม่ได้เพิ่ม bin folder เข้า PATH ให้ (หรือยังไม่ได้เปิด PowerShell หน้าต่างใหม่) หาตำแหน่งจริงด้วย:
>
> ```powershell
> Get-ChildItem "C:\Program Files\MySQL" -Recurse -Filter "mysql.exe" -ErrorAction SilentlyContinue | Select-Object FullName
> ```
>
> แล้วเรียกแบบเต็ม path ไปก่อนก็ได้ (แก้เลขเวอร์ชันให้ตรงกับที่เจอจริง):
>
> ```powershell
> & "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe" -u root -p
> ```
>
> หรือเพิ่มเข้า PATH ถาวร (Run as Administrator แล้วเปิด PowerShell ใหม่หลังรัน):
>
> ```powershell
> [Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Program Files\MySQL\MySQL Server 8.4\bin", "Machine")
> ```

### สร้างฐานข้อมูล

ใน prompt `mysql>` (หรือใน MySQL Workbench):

```sql
CREATE DATABASE accounting_tracker CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

## 4. ตั้งค่า IP ของเครื่องนี้ในวง LAN ออฟฟิศ

เครื่องอื่นในออฟฟิศจะเข้าเว็บผ่าน IP ของเครื่องนี้ ต้อง**กำหนด IP ให้คงที่**

1. เปิด PowerShell รัน `ipconfig` จด `IPv4 Address`, `Subnet Mask`, `Default Gateway`
2. เลือกวิธีใดวิธีหนึ่ง:
   - **แนะนำ**: ตั้ง DHCP Reservation ที่หน้าเว็บเราเตอร์ (ผูก MAC address ของเครื่องนี้กับ IP คงที่)
   - **สำรอง**: ตั้ง Static IP ที่ตัวเครื่อง — Settings → Network & Internet → เลือกการ์ดเน็ต →
     Edit → Manual → กรอก IP (นอกช่วง DHCP), Subnet mask, Gateway, DNS

จดค่า IP ที่ได้ (เช่น `192.168.1.50`) ไว้ใช้ในข้อ 6

---

## 5. ติดตั้ง dependencies ของโปรเจกต์

### 5.1 Backend

```powershell
cd C:\Users\User01\Desktop\program\Project\AccountingTracker\Accounting-Tracker-Api
npm install
```

### 5.2 Frontend

```powershell
cd C:\Users\User01\Desktop\program\Project\AccountingTracker\Accounting-Tracker-Fontend
npm install
```

---

## 6. ตั้งค่าไฟล์ Environment

### 6.1 Backend — `Accounting-Tracker-Api\.env`

คัดลอก `.env.example` เป็น `.env` แล้วแก้ไข (ต่างจากไฟล์ `.env.docker` ตรงที่
`DATABASE_HOST` เป็น `localhost` เพราะ MySQL รันตรงบนเครื่องนี้ ไม่ใช่ container):

```
PORT=8000

DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=<รหัสผ่าน root ที่ตั้งไว้ตอนติดตั้ง MySQL>
DATABASE_NAME=accounting_tracker

DATABASE_URL="mysql://root:<รหัสผ่านเดียวกัน>@localhost:3306/accounting_tracker"

JWT_SECRET=<สุ่มค่าใหม่>
```

สุ่ม `JWT_SECRET`:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

> ⚠️ ถ้ารหัสผ่านมีอักขระพิเศษ เช่น `@ # % &` ต้องเข้ารหัส URL ใน `DATABASE_URL`
> (เช่น `@` → `%40`) แนะนำตั้งรหัสผ่านเป็นตัวอักษร/ตัวเลขล้วนจะได้ไม่ต้องกังวล

### 6.2 Frontend — `Accounting-Tracker-Fontend\.env`

แก้ไขค่า `VITE_API_URL` ให้เป็น IP ของเครื่องนี้ (จากข้อ 4):

```
VITE_API_URL=http://192.168.1.50:8000
```

> สำคัญมาก: ค่านี้จะถูกฝังเข้าไปในไฟล์หน้าเว็บตอน **build** (ข้อ 7) ถ้าใส่ผิดหรือใส่
> `localhost` เครื่องอื่นในออฟฟิศจะเปิดเว็บได้แต่เรียก API ไม่ได้เลย ถ้าแก้ IP ทีหลัง
> ต้อง build frontend ใหม่เสมอ

---

## 7. สร้างตาราง DB, สร้าง admin, และ build frontend

### 7.1 สร้างตารางฐานข้อมูล (ครั้งแรกครั้งเดียว)

```powershell
cd C:\Users\User01\Desktop\program\Project\AccountingTracker\Accounting-Tracker-Api
npx prisma generate
npx prisma db push
```

### 7.2 สร้างผู้ใช้ admin เริ่มต้น (ครั้งแรกครั้งเดียว)

```powershell
npx tsx prisma/seed.ts
```

จะได้บัญชีเริ่มต้น Email: `admin@test.com` / Password: `123456`
**ล็อกอินแล้วรีบเปลี่ยนรหัสผ่านทันที** ผ่านเมนู Users

### 7.3 Build frontend

```powershell
cd C:\Users\User01\Desktop\program\Project\AccountingTracker\Accounting-Tracker-Fontend
npm run build
```

จะได้โฟลเดอร์ `dist\` ที่มีไฟล์ static พร้อมใช้งาน (ต้องทำหลังตั้ง `.env` ในข้อ 6.2 แล้วเท่านั้น
ถ้าแก้ `.env` ทีหลังต้องรันคำสั่งนี้ซ้ำ)

---

## 8. ติดตั้ง NSSM เพื่อให้รันเป็น Windows Service

ทำให้ backend/frontend รันเบื้องหลังตลอดเวลา และ**ขึ้นเองตอนเครื่องบูต แม้ไม่มีใคร login**

1. ดาวน์โหลด NSSM จาก https://nssm.cc/download (เลือกไฟล์ zip เวอร์ชันล่าสุด)
2. แตกไฟล์ zip ไปไว้ที่ไหนก็ได้ (ในนั้นจะมีโฟลเดอร์ `win64\nssm.exe`) — ตัวอย่างในคู่มือนี้ใช้
   `C:\Users\User01\Desktop\program\nssm-2.24-101-g897c7ad\win64\nssm.exe`
   (แทนที่ด้วย path จริงที่คุณแตกไฟล์ไว้)
3. เปิด PowerShell **แบบ Run as Administrator**

### 8.1 สร้าง Service สำหรับ Backend

```powershell
C:\Users\User01\Desktop\program\nssm-2.24-101-g897c7ad\win64\nssm.exe install AccountingTrackerAPI
```

จะเด้งหน้าต่าง GUI ขึ้นมา กรอก:

- **Path**: `C:\Windows\System32\cmd.exe`
- **Startup directory**: `C:\Users\User01\Desktop\program\Project\AccountingTracker\Accounting-Tracker-Api`
- **Arguments**: `/c npm start`

ไปแท็บ **Details** ตั้งชื่อที่แสดง เช่น "AccountingTracker API" แล้วกด **Install service**

### 8.2 สร้าง Service สำหรับ Frontend

ไม่ต้องติดตั้ง `serve` แยก ใช้ `npx serve` ได้เลย (หลีกเลี่ยงปัญหา PATH ของ global npm package):

```powershell
C:\Users\User01\Desktop\program\nssm-2.24-101-g897c7ad\win64\nssm.exe install AccountingTrackerWeb
```

กรอก:

- **Path**: `C:\Windows\System32\cmd.exe`
- **Startup directory**: `C:\Users\User01\Desktop\program\Project\AccountingTracker\Accounting-Tracker-Fontend`
- **Arguments**: `/c npx serve -s dist -l 80`

(`-s` คือ single-page-app mode — ทำให้ refresh หน้าใน route ย่อยของ React Router ไม่ 404)

### 8.3 สั่งให้ทั้งสอง service เริ่มทำงาน

```powershell
Start-Service AccountingTrackerAPI
Start-Service AccountingTrackerWeb
```

เช็คสถานะ:

```powershell
Get-Service AccountingTrackerAPI, AccountingTrackerWeb
```

ต้องเห็นสถานะ `Running` ทั้งคู่ ทั้งสอง service ถูกตั้งเป็น **Automatic startup** โดย default
ของ NSSM อยู่แล้ว (เช็ค/แก้ได้ที่ `services.msc` ถ้าต้องการ)

> **ถ้าสถานะขึ้น `Paused`** แปลว่าโปรเซสที่สั่งให้รัน exit/crash ทันทีซ้ำๆ จน NSSM
> หยุดพยายาม restart ให้ สาเหตุที่พบบ่อยที่สุดคือ **Startup directory ผิด** (ไม่ตรงกับ
> ตำแหน่งจริงที่วางโปรเจกต์ไว้) ลองรันคำสั่งใน Arguments ด้วยมือตรงๆ ในโฟลเดอร์นั้นก่อน
> เพื่อดู error จริง เช่น:
>
> ```powershell
> cd C:\Users\User01\Desktop\program\Project\AccountingTracker\Accounting-Tracker-Api
> cmd /c npm start
> ```
>
> ถ้าอยากให้ NSSM เก็บ log ไว้ถาวรด้วย ตั้งได้ที่ `nssm edit <ชื่อ service>` → แท็บ **I/O**
> ใส่ path ไฟล์ log สำหรับ Output/Error

---

## 9. เปิด Windows Firewall ให้พอร์ตที่ใช้

เปิด PowerShell **แบบ Run as Administrator**:

```powershell
New-NetFirewallRule -DisplayName "AccountingTracker Web" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow
New-NetFirewallRule -DisplayName "AccountingTracker API" -Direction Inbound -Protocol TCP -LocalPort 8000 -Action Allow
```

ไม่ต้องเปิดพอร์ต 3306 (MySQL) ให้เครื่องอื่นเข้าถึง เพราะ backend เรียก MySQL ผ่าน `localhost`
บนเครื่องเดียวกันเท่านั้น

> ถ้าตั้ง Firewall rule ถูกแล้วแต่เครื่องอื่นยังเข้าไม่ได้ ให้เช็ค **Network Profile** ของ
> การ์ดเน็ตด้วย: `Get-NetConnectionProfile` — ถ้าเป็น `Public` บาง rule อาจไม่ครอบคลุม
> ลองเปลี่ยนเป็น `Private` ที่ Settings → Network & Internet → คลิกเครือข่ายที่ใช้ →
> Network profile type → Private

---

## 10. ทดสอบว่าใช้งานได้

**จากเครื่องนี้เอง**: เปิดเบราว์เซอร์ไปที่ `http://localhost`

**จากเครื่องอื่นในออฟฟิศ**: เปิดเบราว์เซอร์ไปที่ `http://<IP เครื่องนี้>` เช่น `http://192.168.1.50`

ถ้าเข้าหน้าเว็บได้แต่ล็อกอินแล้วไม่มีอะไรเกิดขึ้น/ error เชื่อมต่อไม่ได้ ให้เช็คว่า
`VITE_API_URL` ในข้อ 6.2 ใส่ IP ถูกไหม แล้ว build ใหม่ + restart service:

```powershell
cd C:\Users\User01\Desktop\program\Project\AccountingTracker\Accounting-Tracker-Fontend
npm run build
Restart-Service AccountingTrackerWeb
```

ถ้าเข้าไม่ได้เลย (`took too long to respond`) ให้ไล่เช็คตามลำดับ:

1. `Get-Service AccountingTrackerAPI, AccountingTrackerWeb` — สถานะต้อง `Running`
2. เปิด `http://localhost` **บนเครื่องเซิร์ฟเวอร์เอง** ก่อน — ถ้าใช้ไม่ได้แม้แต่บนเครื่องตัวเอง
   ปัญหาอยู่ที่ service ไม่ใช่ firewall/network
3. `netstat -ano | findstr ":80"` — เช็คว่ามีอะไร listen พอร์ต 80 จริง
4. `Get-NetFirewallRule -DisplayName "AccountingTracker*"` — เช็คว่า rule ยัง Enabled อยู่
5. `ipconfig` — ยืนยันว่า IP ปัจจุบันตรงกับที่ตั้งไว้ในข้อ 4

---

## คำสั่งที่ใช้บ่อย

```powershell
# ดูสถานะ
Get-Service AccountingTrackerAPI, AccountingTrackerWeb

# หยุด/เริ่ม/รีสตาร์ท
Stop-Service AccountingTrackerAPI
Start-Service AccountingTrackerAPI
Restart-Service AccountingTrackerAPI

# แก้ค่า config ของ service (Path/Startup directory/Arguments/I-O log)
C:\Users\User01\Desktop\program\nssm-2.24-101-g897c7ad\win64\nssm.exe edit AccountingTrackerAPI

# ลบ service (ถ้าต้องการถอนการติดตั้ง)
C:\Users\User01\Desktop\program\nssm-2.24-101-g897c7ad\win64\nssm.exe remove AccountingTrackerAPI confirm
```

MySQL service ปกติชื่อ `MySQL80`/`MySQL84` เช็ค/สั่งได้ผ่าน `Get-Service MySQL84` เช่นกัน

---

## อัปเดตโค้ดเวอร์ชันใหม่ในอนาคต

```powershell
Stop-Service AccountingTrackerAPI
Stop-Service AccountingTrackerWeb

# เอาโค้ดใหม่มาแทนที่ (ยกเว้นไฟล์ .env ที่ตั้งไว้)

cd C:\Users\User01\Desktop\program\Project\AccountingTracker\Accounting-Tracker-Api
npm install
npx prisma generate
npx prisma db push

cd C:\Users\User01\Desktop\program\Project\AccountingTracker\Accounting-Tracker-Fontend
npm install
npm run build

Start-Service AccountingTrackerAPI
Start-Service AccountingTrackerWeb
```

---

## ภาคผนวก: ย้ายข้อมูลจากเครื่อง dev มาที่เครื่องออฟฟิศ (ถ้าต้องการ)

**บนเครื่อง dev** (ที่มี MySQL เดิมอยู่):

```powershell
mysqldump -u root -p accounting_tracker > accounting_tracker_backup.sql
```

คัดลอกไฟล์ `.sql` มาที่เครื่องออฟฟิศ (USB/แชร์ไฟล์)

**บนเครื่องออฟฟิศ** (หลังทำข้อ 3 สร้าง database เปล่าเสร็จแล้ว แต่**ก่อน**ทำข้อ 7.2 สร้าง admin):

```powershell
mysql -u root -p accounting_tracker < accounting_tracker_backup.sql
```

ข้อมูลเดิมรวมถึงบัญชีผู้ใช้เดิมจะเข้ามาแทนตารางเปล่า ไม่ต้องรันข้อ 7.2 อีก

> เอกสารที่ลูกค้าอัปโหลดไว้ (โฟลเดอร์ `Accounting-Tracker-Api\uploads\customers\`) เป็น
> ไฟล์บนดิสก์ปกติ คนละส่วนกับฐานข้อมูล ถ้าต้องการย้ายไฟล์เอกสารมาด้วย ให้คัดลอกทั้ง
> โฟลเดอร์ `uploads\customers\` จากเครื่อง dev ไปวางทับที่ตำแหน่งเดียวกันบนเครื่องออฟฟิศ
> (`Accounting-Tracker-Api\uploads\customers\`) ก่อน start service
