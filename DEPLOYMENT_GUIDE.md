# คู่มือติดตั้ง AccountingTracker บนเครื่อง Windows (ออฟฟิศ)

คู่มือนี้สำหรับติดตั้งระบบบนเครื่อง Windows PC ที่จะใช้งานจริงในออฟฟิศ โดยรันผ่าน Docker
(backend + frontend + database ทั้งหมดอยู่ใน container เดียวกัน)

ทำตามลำดับข้อ 1 → 8 ห้ามข้าม โดยเฉพาะเรื่อง virtualization (ข้อ 2) ถ้าข้อนี้ไม่ผ่าน
Docker Desktop จะรันไม่ได้เลย

---

## สรุปสิ่งที่ต้องเตรียม

- เครื่อง Windows 10/11 แบบ 64-bit, สิทธิ์ Administrator
- CPU รองรับ virtualization (Intel VT-x / AMD-V) และเปิดใช้งานใน BIOS แล้ว
- อินเทอร์เน็ต (ใช้แค่ตอนติดตั้งครั้งแรก ดาวน์โหลดโปรแกรม/อิมเมจ หลังจากนั้นรันในเครื่อง local ได้เลยไม่ต้องต่อเน็ตตลอด)
- ไฟล์โปรเจกต์ทั้งหมด (โฟลเดอร์ `AccountingTracker`)

---

## 1. เช็ค Virtualization ใน BIOS ก่อน

Docker Desktop บน Windows ต้องใช้ WSL2 ซึ่งต้องการ virtualization ระดับฮาร์ดแวร์
ถ้าเครื่องไม่เปิดไว้ ตอนเปิด Docker Desktop จะเจอ error
**"Virtualization support not detected"**

วิธีเช็ค/เปิด:

1. รีสตาร์ทเครื่อง แล้วกดปุ่มเข้า BIOS/UEFI ตอนบูต (ปกติคือ `Del`, `F2`, `F10` หรือ `Esc`
   ขึ้นกับยี่ห้อเมนบอร์ด/โน้ตบุ๊ก)
2. หาเมนูชื่อประมาณ **"Intel Virtualization Technology"**, **"Intel VT-x"**,
   **"AMD-V"** หรือ **"SVM Mode"** (มักอยู่ใต้เมนู Advanced / CPU Configuration)
3. ตั้งค่าเป็น **Enabled**
4. กด Save & Exit (มักเป็นปุ่ม `F10`)

> ถ้าเป็นเครื่องที่ IT บริษัทล็อก BIOS ไว้ อาจต้องให้ IT เป็นคนเปิดให้

หลังเปิดแล้ว ให้เปิด Task Manager → แท็บ Performance → CPU แล้วดูว่ามุมขวาล่าง
"Virtualization: Enabled" หรือไม่ ถ้าเป็น Enabled แล้วถือว่าผ่านข้อนี้

---

## 2. ติดตั้ง Docker Desktop

1. ดาวน์โหลด Docker Desktop for Windows จาก https://www.docker.com/products/docker-desktop/
2. รันตัวติดตั้ง เลือกให้ใช้ **WSL 2** เป็น backend (เป็นค่า default อยู่แล้ว)
3. ถ้าระหว่างติดตั้งมีข้อความให้เปิด Windows feature (WSL2 / Virtual Machine
   Platform) ให้กดยอมรับ แล้วรีสตาร์ทเครื่องตามที่โปรแกรมขอ
4. หลังรีสตาร์ท เปิด Docker Desktop ขึ้นมา รอจนไอคอนวาฬที่ system tray
   ขึ้นสถานะ "Engine running" (สีเขียว)
5. ตั้งค่าให้ Docker Desktop **เปิดเองตอนล็อกอินเข้าเครื่อง**:
   Docker Desktop → Settings (รูปเฟือง) → General → ติ๊ก
   **"Start Docker Desktop when you sign in"**

ทดสอบว่าติดตั้งสำเร็จ เปิด PowerShell แล้วรัน:

```powershell
docker --version
docker compose version
```

ต้องเห็นเลขเวอร์ชันทั้งสองคำสั่ง ถ้า error แปลว่า Docker Desktop ยังไม่พร้อม
(รอสักครู่แล้วลองใหม่ หรือดูว่าไอคอนใน system tray ขึ้นสีเขียวหรือยัง)

---

## 3. นำไฟล์โปรเจกต์ไปไว้ที่เครื่อง

คัดลอกโฟลเดอร์ `AccountingTracker` ทั้งโฟลเดอร์ไปไว้ในเครื่อง เช่น
`C:\AccountingTracker\` (จะ copy ผ่าน USB/แชร์ไฟล์ หรือ `git clone` มาก็ได้
ถ้ามีสิทธิ์เข้าถึง repository)

โครงสร้างที่ควรเห็นหลัง copy:

```
C:\AccountingTracker\
├── Accounting-Tracker-Api\
├── Accounting-Tracker-Fontend\
├── docker-compose.yml
├── .env.example
└── DEPLOYMENT_GUIDE.md   (ไฟล์นี้)
```

---

## 4. ตั้งค่า IP ของเครื่องนี้ในวง LAN ออฟฟิศ

เครื่องอื่นในออฟฟิศจะเข้าเว็บผ่าน IP ของเครื่องนี้ ดังนั้นต้อง**กำหนด IP ให้คงที่**
ไม่ให้เปลี่ยนไปมา ไม่งั้นวันหลัง IP เปลี่ยน คนอื่นจะเข้าเว็บไม่ได้

### 4.1 เช็ค IP/เครือข่ายปัจจุบันก่อน

เปิด PowerShell รัน:

```powershell
ipconfig
```

จดค่าที่ได้จากช่อง (ปกติเป็นของการ์ดเน็ตที่ใช้งานอยู่ เช่น Ethernet หรือ Wi-Fi):

- `IPv4 Address` เช่น `192.168.1.45`
- `Subnet Mask` เช่น `255.255.255.0`
- `Default Gateway` เช่น `192.168.1.1` (คือ IP ของเราเตอร์)

### 4.2 เลือกวิธีตั้ง IP คงที่ (เลือกอย่างใดอย่างหนึ่ง)

**วิธีที่แนะนำ — ตั้ง DHCP Reservation ที่เราเตอร์**
เข้าหน้าเว็บจัดการเราเตอร์ (ปกติคือพิมพ์ IP ของ Default Gateway ใน browser เช่น
`http://192.168.1.1`) หาเมนู DHCP / Address Reservation แล้วผูก MAC address
ของเครื่องนี้ (ดูได้จาก `ipconfig /all` ช่อง Physical Address) เข้ากับ IP ที่ต้องการ
ให้คงที่ตลอด — วิธีนี้ปลอดภัยกว่าเพราะเราเตอร์จะไม่แจก IP นี้ซ้ำให้เครื่องอื่น

**วิธีสำรอง — ตั้ง Static IP ที่ตัวเครื่อง Windows เอง**
Settings → Network & Internet → เลือกการ์ดเน็ตที่ใช้ (Ethernet/Wi-Fi) →
Edit (ใต้ IP assignment) → เปลี่ยนจาก Automatic (DHCP) เป็น **Manual** → เปิด
IPv4 → กรอก:

- IP address: เลือกเลขที่ยังไม่มีใครใช้ในวงเดียวกัน เช่น `192.168.1.50`
  (ต้องอยู่นอกช่วงที่เราเตอร์แจก DHCP เพื่อกันชนกับเครื่องอื่น)
- Subnet mask: ใช้ค่าเดิมจาก `ipconfig` เช่น `255.255.255.0`
- Gateway: ใช้ค่า Default Gateway เดิม
- DNS: ใส่ `8.8.8.8` หรือค่า Gateway เดิมก็ได้

จดค่า IP ที่ตั้งไว้ (เช่น `192.168.1.50`) ไว้ใช้ในขั้นต่อไป

---

## 5. ตั้งค่าไฟล์ Environment

### 5.1 ไฟล์ `.env` (อยู่ที่ root ของโปรเจกต์ ข้าง `docker-compose.yml`)

คัดลอก `.env.example` เป็น `.env` แล้วแก้ไข:

```
MYSQL_ROOT_PASSWORD=<ตั้งรหัสผ่านใหม่ที่คาดเดายาก>
FRONTEND_API_URL=http://<IP ที่ตั้งไว้ในข้อ 4>:8000
```

ตัวอย่าง ถ้า IP เครื่องคือ `192.168.1.50`:

```
MYSQL_ROOT_PASSWORD=Off1ce-Acc0unt-2026-XyZ
FRONTEND_API_URL=http://192.168.1.50:8000
```

> `FRONTEND_API_URL` นี้สำคัญมาก เพราะจะถูกฝังเข้าไปในหน้าเว็บตอน build
> ถ้าใส่ผิดหรือใส่ `localhost` เครื่องอื่นในออฟฟิศจะเปิดเว็บได้แต่เรียก API ไม่ได้เลย

### 5.2 ไฟล์ `Accounting-Tracker-Api\.env.docker`

คัดลอก `Accounting-Tracker-Api\.env.docker.example` เป็น
`Accounting-Tracker-Api\.env.docker` แล้วแก้ไข:

```
PORT=8000

DATABASE_HOST=mysql
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=<รหัสผ่านเดียวกับ MYSQL_ROOT_PASSWORD ในข้อ 5.1>
DATABASE_NAME=accounting_tracker

DATABASE_URL="mysql://root:<รหัสผ่านเดียวกัน>@mysql:3306/accounting_tracker"

JWT_SECRET=<สุ่มค่าใหม่ ห้ามใช้ค่าตัวอย่าง>
```

วิธีสุ่ม `JWT_SECRET` ใหม่ (รันใน PowerShell ถ้ามี Node.js อยู่ในเครื่อง หรือใช้
เครื่องไหนก็ได้ที่มี Node.js):

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

จะได้ข้อความยาวๆ แบบสุ่ม คัดลอกไปใส่แทนค่า `JWT_SECRET` ด้านบน

> ⚠️ ถ้ารหัสผ่านมีอักขระพิเศษ เช่น `@ # % &` ให้ระวังตอนใส่ใน `DATABASE_URL`
> อาจต้องเข้ารหัส URL (เช่น `@` → `%40`) ไม่งั้นเชื่อมต่อ MySQL ไม่ได้
> แนะนำให้ตั้งรหัสผ่านเป็นตัวอักษร/ตัวเลขล้วนจะได้ไม่ต้องกังวลเรื่องนี้

---

## 6. เปิด Windows Firewall ให้พอร์ตที่ใช้

เครื่องอื่นในออฟฟิศต้องเข้าพอร์ต 80 (หน้าเว็บ) และ 8000 (API) ได้ ถ้า Windows
Firewall เปิดอยู่ (ค่า default) ต้องเพิ่ม rule อนุญาตก่อน

เปิด PowerShell **แบบ Run as Administrator** แล้วรัน:

```powershell
New-NetFirewallRule -DisplayName "AccountingTracker Web" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow
New-NetFirewallRule -DisplayName "AccountingTracker API" -Direction Inbound -Protocol TCP -LocalPort 8000 -Action Allow
```

ไม่ต้องเปิดพอร์ต 3307 (MySQL) ให้เครื่องอื่นเข้าถึง เพราะไม่มีใครต้องต่อ MySQL
ตรงๆ จากเครื่องอื่น (ปล่อยไว้ใช้ debug จากเครื่องนี้เองพอ)

---

## 7. Build และรันระบบ

เปิด PowerShell ไปที่โฟลเดอร์โปรเจกต์:

```powershell
cd C:\AccountingTracker
docker compose up -d --build
```

ครั้งแรกจะใช้เวลาสักพัก (ดาวน์โหลด image + build) รอจนเสร็จ แล้วเช็คสถานะ:

```powershell
docker compose ps
```

ต้องเห็นทั้ง 3 service (`mysql`, `backend`, `frontend`) มีสถานะ `running` หรือ
`healthy`

### 7.1 สร้างตารางฐานข้อมูล (ทำครั้งแรกครั้งเดียว)

ฐานข้อมูลใน container เป็นของใหม่ล้วนๆ ยังไม่มีตารางใดๆ ต้องสั่งสร้างก่อน:

```powershell
docker compose exec backend npx prisma db push
```

### 7.2 สร้างผู้ใช้ admin เริ่มต้น (ทำครั้งแรกครั้งเดียว)

```powershell
docker compose exec backend npx tsx prisma/seed.ts
```

จะได้บัญชีเริ่มต้น:

- Email: `admin@test.com`
- Password: `123456`

**⚠️ ล็อกอินเข้าไปแล้วให้รีบเปลี่ยนรหัสผ่านทันที** ผ่านเมนู Users →
แก้ไขบัญชี Admin → ใส่รหัสผ่านใหม่ (แนะนำเปลี่ยนอีเมลด้วยถ้าจะใช้จริง)

---

## 8. ทดสอบว่าใช้งานได้

**จากเครื่องนี้เอง**: เปิดเบราว์เซอร์ไปที่ `http://localhost`

**จากเครื่องอื่นในออฟฟิศ**: เปิดเบราว์เซอร์ไปที่ `http://<IP เครื่องนี้>` เช่น
`http://192.168.1.50` (ต้องเห็นหน้า Login เหมือนกัน)

ถ้าเข้าหน้าเว็บได้แต่ล็อกอินแล้วไม่มีอะไรเกิดขึ้น/ขึ้น error เชื่อมต่อไม่ได้
ให้เช็คว่า `FRONTEND_API_URL` ในข้อ 5.1 ใส่ IP ถูกไหม แล้ว build ใหม่:

```powershell
docker compose up -d --build frontend
```

---

## หลังจากติดตั้งเสร็จแล้ว

### เครื่องรีสตาร์ท/ไฟดับ ระบบจะกลับมาเองไหม?

กลับมาเอง ถ้า Docker Desktop ตั้งไว้ให้เปิดตอนล็อกอิน (ข้อ 2.5) และมีคนล็อกอิน
เข้า Windows หลังเปิดเครื่อง container ทั้งหมดจะสตาร์ทเองอัตโนมัติ
(ตั้งค่า `restart: unless-stopped` ไว้ในระบบแล้ว)

> ถ้าอยากให้ระบบขึ้นเองแม้ไม่มีใครล็อกอินเข้าเครื่องเลย ต้องตั้งให้ Windows
> auto-login เข้าบัญชีที่กำหนดตอนบูต (ถามเพิ่มได้ถ้าต้องการ)

### คำสั่งที่ใช้บ่อย

```powershell
# ดู log ของแต่ละ service
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mysql

# หยุดระบบ (ข้อมูลยังอยู่ ไม่หาย)
docker compose down

# เริ่มใหม่
docker compose up -d

# รีสตาร์ทเฉพาะ service เดียว
docker compose restart backend
```

### อัปเดตโค้ดเวอร์ชันใหม่ในอนาคต

```powershell
# เอาโค้ดใหม่มาแทนที่โฟลเดอร์เดิม (ยกเว้น .env / .env.docker ที่ตั้งไว้)
docker compose up -d --build
```

---

## ภาคผนวก: ย้ายข้อมูลจากเครื่อง dev มาที่เครื่องออฟฟิศ (ถ้าต้องการ)

ถ้ามีข้อมูลลูกค้า/ภาษีที่สร้างไว้ตอนพัฒนาระบบแล้วอยากย้ายมาที่เครื่องออฟฟิศ
แทนที่จะเริ่มฐานข้อมูลเปล่า:

**บนเครื่อง dev** (ที่มี MySQL เดิมอยู่):

```powershell
mysqldump -u root -p accounting_tracker > accounting_tracker_backup.sql
```

คัดลอกไฟล์ `accounting_tracker_backup.sql` มาที่เครื่องออฟฟิศ (USB/แชร์ไฟล์)

**บนเครื่องออฟฟิศ** (หลังทำข้อ 7 เสร็จแล้ว แต่**ก่อน**ทำข้อ 7.2 สร้าง admin):

```powershell
docker compose exec -T mysql mysql -u root -p<MYSQL_ROOT_PASSWORD> accounting_tracker < accounting_tracker_backup.sql
```

(ใส่รหัสผ่านที่ตั้งไว้ในข้อ 5.1 แทน `<MYSQL_ROOT_PASSWORD>`) ข้อมูลเดิมทั้งหมด
รวมถึงบัญชีผู้ใช้เดิมจะเข้ามาแทนตารางเปล่า ไม่ต้องรันข้อ 7.2 อีกเพราะมี admin
เดิมติดมาด้วยแล้ว

> เอกสารที่อัปโหลดไว้ (โฟลเดอร์ `uploads/`) เป็นคนละส่วนกับฐานข้อมูล ถ้าต้องการ
> ย้ายไฟล์เอกสารมาด้วย ต้องคัดลอกโฟลเดอร์ `uploads/customers/` จากเครื่อง dev
> แล้ว copy เข้าไปใน volume `uploads_data` ของเครื่องออฟฟิศ (บอกเพิ่มได้ถ้าต้องการ
> ขั้นตอนละเอียด)
