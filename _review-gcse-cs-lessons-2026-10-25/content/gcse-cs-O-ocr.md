# OCR: GCSE Computer Science lesson content (for checking)

Generated from the same resolved module content the pages are built from. Diagrams are described by their plan text. ✓ marks the key.

## Systems architecture  (OCR GCSE Computer Science (J277) · 1.1)
Page: `computer-science-gcse-ocr-systems-architecture-mini-lesson.html`

### Mission 1: ENIAC took days to reprogram. Your phone swaps apps instantly. Why?  [module H1]

*Guess chips:* The phone rewires its own chip · Each app's instructions are stored in memory · The phone has a chip for each app · I'm not sure yet

**1 · Teach — Programs live in memory**
> Diagram D1: Stored program: a CPU box on the left, main memory on the right drawn as a table of 8 numbered locations (addresses 0–7). Locations 0–4 hold instructions written in words ("LOAD 6", "ADD 7", "STORE 6", "OUTPUT 6", "STOP"); locations 6 and 7 hold data ("15", "27"), location 5 empty. Instructions shaded blue, data shaded green, legend "instruction" / "data". One arrow from memory to CPU labelled "copied in, one at a time". Small input device icon left of CPU, output device icon right, secondary storage icon below memory with arrow "programs loaded from here".
- A program is a list of **instructions** in binary (machine code), processed by the **CPU**.
- A running program's instructions and data are both held in **main memory (RAM)**. This is the **Von Neumann architecture**.
- New program? Load new instructions into memory. Nothing is rewired.
- Input devices send data in; output devices present results; secondary storage keeps programs when they are not running.

**3 · Teach — Inside the CPU**
> Diagram D2: CPU block diagram. Variant A E I (screen 2): CPU box containing CU, ALU, a row of 3 unlabelled "register" boxes, clock symbol; main memory box outside the CPU. For A: one thick double-headed line labelled "bus". For E I (screen 4): three lines between CPU and memory: address bus (single arrow CPU→memory, orange), data bus (double arrow, blue), control bus (double arrow, grey). Variant O C Q (screen 3): CPU box with CU, ALU, and labelled registers PC, MAR, MDR, ACC; CIR shown for C and Q only; cache box inside CPU for O and Q only. For C: same three coloured buses as E I.
| Component | What it does |
|---|---|
| **Control unit (CU)** | Decodes instructions and sends control signals to coordinate the other parts |
| **Arithmetic logic unit (ALU)** | Carries out calculations and logical operations, such as comparisons |
| **Program counter (PC)** | Holds the **address** of the next instruction |
| **Memory address register (MAR)** | Holds the **address** in memory to be read from or written to |
| **Memory data register (MDR)** | Holds the **data** or instruction just read from memory, or about to be written |
| **Accumulator (ACC)** | Holds the result of calculations done by the ALU |
- An address says *where* something is; data is *what* is stored there.
- **Cache** is a small, very fast memory in the CPU for frequently used instructions and data.

**5 · Teach — The cycle that never stops**
> Diagram D3: FDE cycle as a loop of three arrows: Fetch → Decode → Execute → back to Fetch, with the clock drawn beside it ("each step timed by clock pulses"). Board labels: A title "Fetch-Execute cycle", O "fetch-execute cycle", E C Q I "fetch–decode–execute cycle". Optional animated variant for O C Q: PC=4 → MAR=4 → memory location 4 → MDR (→ CIR for C Q) → PC=5. For C, E, I show the address travelling on the address bus and the instruction returning on the data bus.
- Kept in step by the clock, the CPU repeats this cycle billions of times a second: the **fetch-execute cycle**.
| Stage | What happens |
|---|---|
| **Fetch** | The address in the PC is copied to the MAR. The instruction at that address is copied into the MDR. The PC goes up by 1 |
| **Decode** | The control unit works out what the instruction means |
| **Execute** | The instruction is carried out: the ALU may do a calculation, with the result stored in the accumulator, or data may be read from or written to memory |

**6 · Quick check**
An instruction says "add the number stored at address 12 to the total". In which stage is the number at address 12 read from memory?
- A. Fetch, because the CPU fetches everything it needs then — *Fetch only brings in the instruction itself; the number it refers to is not known until it is decoded.*
- B. Decode, because the CU reads values while decoding — *Decoding works out what the instruction means; it does not read the data the instruction uses.*
- C. ✓ Execute, when the instruction is carried out — *Right: the execute stage can include reading from or writing to main memory.*
- D. Between cycles, while the clock waits for the next pulse — *There is no gap for this; every memory access happens within a stage of the cycle.*

**7 · Quick check**
Which two registers hold memory addresses rather than data or instructions?
- A. The MDR and the accumulator — *Both hold data: the MDR holds what was read from or will be written to memory, and the accumulator holds ALU results.*
- B. The MAR and the MDR — *The MAR holds an address, but the MDR holds the data or instruction stored at that address.*
- C. ✓ The program counter and the MAR — *Right: the PC holds the address of the next instruction; the MAR holds the address to be read from or written to.*
- D. The program counter and the accumulator — *The PC holds an address, but the accumulator holds the result of a calculation.*

**8 · Teach — Embedded systems**
- An **embedded system** is a computer built into a larger device to do one **dedicated** job.
- Examples: washing machine, microwave, thermostat, car engine management, traffic lights, vending machine.
- Usually small, cheap, low power and reliable. Its program is stored permanently, often in ROM.
- A **general-purpose** computer, such as a PC or laptop, runs many different programs.

**9 · Quick check**
Which of these is **not** an embedded system?
- A. ✓ A laptop used for homework, games and video calls — *Right: a laptop is general purpose; it runs many different programs.*
- B. The chip that controls the anti-lock brakes in a car — *This is embedded: it does one dedicated job inside the car.*
- C. The controller that runs a washing machine's wash programs — *This is embedded: a dedicated computer inside a larger machine, doing one job.*
- D. The circuit that runs a digital central-heating thermostat — *This is embedded: it only ever controls the heating.*

**10 · Mission check**
ENIAC took days to reprogram. Why can your phone swap apps instantly?
- A. The phone's chip rewires its circuits whenever you tap an app — *Nothing is rewired; the same CPU circuits run every app.*
- B. ✓ Each app's instructions are loaded into memory, then run — *Right: change what is in memory and the CPU runs a different program.*
- C. The phone has a separate processor built for every single app — *A phone has a few general-purpose cores that run every app; there is not one chip per app.*
- D. The apps run directly from the internet, so nothing is stored — *An app's instructions must be in the phone's memory before the CPU can fetch them.*
Shown after answering: ENIAC's program was set by its wiring, so a new job meant rewiring. In your phone, programs are stored in memory as instructions, just like data. The CPU fetches, decodes and executes whatever instructions are there, so switching apps just means running different instructions.

### Mission 2: Double the cores. Why isn't the computer twice as fast?  [module H2]

*Guess chips:* Extra cores slow the clock down · Not every task can be split between cores · The cores share one ALU · I'm not sure yet

**1 · Teach — Clock speed**
> Diagram D1: A square-wave clock signal over 1 ns: at 1 GHz, 1 pulse; at 3 GHz, 3 pulses in the same window. Two rows, same time axis labelled "1 nanosecond". Each pulse tick labelled "1 cycle".
- The **clock** sends out regular electrical pulses that keep the CPU's parts in step.
- **Clock speed** is the number of clock cycles per second, measured in **hertz (Hz)**.
- 1 GHz = 1,000,000,000 cycles per second, so 3.5 GHz is 3.5 billion.
- Higher clock speed: more fetch–decode–execute cycles each second, so more instructions are processed.

**2 · Calculate**
cycles per second

A CPU has a clock speed of 2.8 GHz. How many clock cycles does it complete each second?
Answer: 2800000000  (accepted: [[2800000000.0, 2800000000.0]])
Feedback (correct): Yes: 2.8 × 1,000,000,000 = 2,800,000,000 cycles every second.
Feedback (wrong): Giga means one billion. 2.8 GHz = 2.8 × 1,000,000,000 = 2,800,000,000 cycles per second.

**3 · Teach — Cores**
> Diagram D2: Two timelines. Top: a task split into 4 equal blocks running on 4 cores side by side, finishing at 1/4 time. Bottom: a task of 4 blocks where each block needs the previous result: the blocks run one after another on core 1, cores 2–4 shown greyed "idle".
- A **core** is a complete processing unit. Each core can fetch, decode and execute instructions on its own.
- A dual-core CPU can process two instructions at the same time; a quad-core CPU, four.
- Doubling the cores rarely doubles the speed: some tasks cannot be split, and one core may wait for another's result.
- Software must be written to use several cores.

**4 · Teach — Cache**
> Diagram D3: Memory hierarchy drawn as distances from the CPU: registers inside, cache next to it (core), RAM further away, secondary storage furthest. Arrow length shows time to fetch. For Q and I: cache split into L1 (inside each core), L2, L3 (shared).
- **Cache** is a small amount of very fast memory on or very near the CPU.
- It holds frequently used instructions and data, saving slower trips to RAM.
- A larger cache holds more, so the CPU waits less. But cache is expensive, so it stays small.

**5 · Quick check**
Sam's CPU often waits for data from RAM. The same small set of instructions is used again and again. Which upgrade is most likely to help?
- A. More cores, so the waiting is split between them — *Extra cores do not make RAM any faster; each core would still wait for the same data.*
- B. More RAM, so more instructions fit in memory — *More RAM lets more be open at once, but each fetch from RAM is just as slow.*
- C. ✓ A larger cache, so more of them are kept close by — *Right: repeated instructions stay in fast cache, so fewer slow trips to RAM are needed.*
- D. A larger hard disk, so instructions load from storage — *Secondary storage is far slower than RAM; the CPU cannot run instructions from it directly.*

**8 · Quick check**
A game only ever uses one core. Which CPU will run it fastest, if everything else is the same?
- A. Quad-core at 2.0 GHz, as it has twice as many cores — *The game uses one core, so the extra cores sit idle; that one core runs at only 2.0 GHz.*
- B. ✓ Dual-core at 3.0 GHz, as its one busy core runs faster — *Right: only one core is used, so the higher clock speed wins.*
- C. Quad-core at 2.0 GHz, since 4 × 2.0 GHz makes 8 GHz in all — *Adding up cores × clock speed only works if the work can be split across every core.*
- D. Neither, as a one-core game runs the same on any CPU — *Clock speed still matters: a faster clock runs the one busy core's instructions sooner.*

**9 · Mission check**
Double the cores. Why isn't the computer twice as fast?
- A. Adding cores forces the clock speed to drop by half — *The clock speed does not halve when cores are added; each core runs at the CPU's clock speed.*
- B. The cores take turns, so only one ever runs at a time — *Cores really do run at the same time; that is the point of having several.*
- C. Extra cores fill the cache, so the CPU must use RAM — *Cores do not use up the cache like this; cache size is a separate factor.*
- D. ✓ Many tasks can't be split, so cores sit waiting — *Right: extra cores only help when the work can be shared out between them.*
Shown after answering: Each core can run instructions at the same time as the others, but only if the work can be split between them. Tasks that can't be split, or where one core must wait for another's result, gain little, so doubling the cores rarely doubles the speed.

### Recap

- Instructions and data are both stored in main memory; the CPU fetches, decodes and executes them, one after another, kept in step by the clock.
- Registers do specific jobs: the PC and MAR hold addresses; the MDR and ACC hold data or instructions.
- An embedded system is a computer inside a larger device that does one dedicated job.
- Higher clock speed means more cycles, and so more instructions, every second.
- More cores help only when the work can be split; a larger cache means fewer slow trips to RAM.

---

## Memory and storage  (OCR GCSE Computer Science (J277) · 1.2.1–1.2.3)
Page: `computer-science-gcse-ocr-memory-storage-mini-lesson.html`

### Mission 1: Pull the plug and unsaved work is gone. So how does it boot?  [module H3]

*Guess chips:* RAM keeps a backup with the power off · Start-up instructions are kept in ROM · It downloads its start-up steps · I'm not sure yet

**1 · Teach — Primary storage**
> Diagram D1: Memory hierarchy pyramid, top to bottom: registers, cache, RAM and ROM (side by side, together labelled "main memory / primary storage"), secondary storage. Side arrows: "faster, smaller, more costly per byte" pointing up. For C (screen 1 only), show the same pyramid; registers and cache drawn lighter as context.
- **Primary storage** (main memory) is memory the CPU can access directly.
- It holds the instructions and data the CPU is using now. Secondary storage is too slow for the CPU to work from directly.
- Main memory is made up of **RAM** and **ROM**.

**2 · Teach — RAM**
- **RAM** (random access memory) holds the operating system, the programs that are open and the data they are using.
- The CPU can **read and write** RAM, so its contents change all the time.
- RAM is **volatile**: its contents are lost when the power is switched off. That is why unsaved work disappears.
- More RAM lets more programs and data be open at once without slowing down.

**3 · Teach — ROM**
> Diagram D2: Power-cut storyboard, three frames: (1) power on: RAM holds "OS, essay.doc", ROM holds "start-up instructions"; (2) power off: RAM blank (grey), ROM unchanged; (3) power on: ROM's instructions load the OS from secondary storage into RAM.
- **ROM** (read-only memory) is **non-volatile**: it keeps its contents with the power off.
- It can only be read. Its contents cannot normally be changed.
- ROM holds the **start-up instructions** (the BIOS or boot program). They load the operating system from secondary storage into RAM.
|  | RAM | ROM |
|---|---|---|
| Keeps data with power off? | No (volatile) | Yes (non-volatile) |
| Can be changed? | Read and write | Read only |
| Holds | Operating system, open programs and data in use | Start-up instructions |
| Size | Gigabytes | Small |

**4 · Quick check**
A washing machine's wash programs must never be lost and must not be changed by the user. Where should they be stored?
- A. In RAM, as the CPU can reach it directly and quickly — *RAM is volatile: the programs would vanish every time the machine is unplugged.*
- B. ✓ In ROM, as it keeps its contents and is read-only — *Right: ROM is non-volatile and read-only, so the programs are safe and fixed.*
- C. In cache, as it is the fastest memory near the CPU — *Cache is volatile and tiny; it only holds copies of data being used right now.*
- D. In registers, as they sit inside the CPU itself — *Registers hold a few values for the current instruction and are wiped when power is lost.*

**5 · Teach — Registers and cache**
> Diagram D1: Memory hierarchy pyramid, top to bottom: registers, cache, RAM and ROM (side by side, together labelled "main memory / primary storage"), secondary storage. Side arrows: "faster, smaller, more costly per byte" pointing up. For C (screen 1 only), show the same pyramid; registers and cache drawn lighter as context.
- **Registers** are tiny memory locations inside the CPU holding the instruction, data or address in use right now.
- **Cache** is small, very fast memory on or near the CPU. It holds copies of frequently used instructions and data, so fewer slow trips to RAM are needed.
- Both are volatile. The faster the memory, the more it costs per byte, so fast memory is kept small.

**6 · Teach — Virtual memory**
> Diagram D3: RAM drawn as 8 page slots, all full (apps A–D). An arrow moves pages of app B to a "virtual memory" area on a hard disk / SSD; app E is loaded into the freed slots. A second arrow shows a page swapping back when app B is selected. A slow-snail or clock icon on the disk arrows.
- When RAM is full, the operating system uses part of secondary storage as **virtual memory**.
- Data and programs not needed right now are moved out of RAM to virtual memory in blocks called **pages**, freeing space.
- When they are needed again, pages are swapped back into RAM.
- Secondary storage is much slower than RAM, so heavy swapping slows the computer down. Adding more RAM is the fix.

**7 · Quick check**
A computer has many apps open and becomes very slow when switching between them. What is the most likely cause?
- A. ROM is full, so the apps cannot be loaded quickly — *ROM holds start-up instructions only; apps are not loaded into ROM.*
- B. The clock slows down when too many apps are open — *Clock speed does not depend on the number of apps open.*
- C. ✓ RAM is full, so pages are swapped to and from storage — *Right: virtual memory is on slow secondary storage, so constant swapping causes the delay.*
- D. The cache has been cleared, so apps must be reinstalled — *Cache only holds copies of data in use; nothing is reinstalled when it changes.*

**8 · Answer**
What word describes memory that loses its contents when the power is switched off?
Accept: volatile | volatile memory
Feedback (correct): Yes. RAM is volatile; ROM is non-volatile.
Feedback (wrong): The word is **volatile**. RAM is volatile, which is why unsaved work is lost. ROM is non-volatile: it keeps its contents with the power off.

**9 · Mission check**
Pull the plug and unsaved work is gone. So how does it boot?
- A. RAM keeps a small backup of the last session — *RAM is volatile: everything in it is lost when the power goes, including any backup.*
- B. The start-up program is downloaded each time — *The computer must start up before it can use a network, so the instructions must already be inside it.*
- C. The CPU's cache holds the start-up program — *Cache is volatile, like RAM, so it is empty after a power cut.*
- D. ✓ Start-up instructions are kept in ROM — *Right: ROM is non-volatile, so the boot instructions survive with the power off.*
Shown after answering: Your essay was in RAM, which is volatile, so it vanished. The start-up instructions are in ROM, which is non-volatile, so they are still there. They load the operating system from secondary storage into RAM, and the computer is ready again.

### Mission 2: One storage firm runs 300,000+ spinning hard disks. Why not SSDs?  [module H4]

*Guess chips:* SSDs lose data when switched off · Hard disks store more for the money · Hard disks are faster for big files · I'm not sure yet

**1 · Teach — Why secondary storage?**
- **Secondary storage** is **non-volatile**: it keeps the operating system, programs and files with the power off.
- It holds far more than RAM, for much less money per gigabyte.
- The CPU does not access it directly. Programs and data are copied into RAM (main memory) first.
- To choose a device, compare its **capacity, speed, portability, durability, reliability** and **cost**.

**2 · Teach — Magnetic storage**
> Diagram D1: Cut-away hard disk: two stacked platters on a spindle, an arm with a read/write head floating just above the top platter. Inset: top view of a platter with 4 concentric tracks (one highlighted orange) and sector lines (one sector highlighted blue). Second inset: a row of 8 magnetised regions shown as arrows N→S or S→N labelled 1 0 1 1 0 0 1 0.
- A **hard disk drive (HDD)** stores data on spinning magnetic **platters**.
- Platters are divided into circular **tracks**, split into **sectors**.
- A moving **read/write head** uses an **electromagnet** to magnetise tiny areas (one way for 1, the other for 0) and to read them.
- Moving parts: slower, and easily damaged if dropped. But huge and cheap per gigabyte.

**3 · Teach — Solid-state storage**
> Diagram D2: Block of flash cells drawn as a grid; one cell enlarged as a transistor with control gate on top and floating gate beneath, electrons (e⁻) trapped in the floating gate = one stored state. Beside it: SSD, SD card and USB drive icons.
- **Solid-state** storage uses **flash memory**: electrical circuits that keep data with the power off. No moving parts.
- Examples: **SSD** (solid-state drive), SD card, USB flash drive.
- Fast, light, low power and robust. But it costs more per gigabyte, and cells wear out after many rewrites.

**4 · Teach — Optical storage**
> Diagram D3: Side view of a disc surface with pits and lands; a laser beam hits a land and reflects back to a sensor, a second beam hits a pit edge and scatters. Capacity bar beneath: CD 0.7 GB, DVD 4.7 GB, Blu-ray 25 GB, drawn to scale.
- A **laser** reads the surface of a spinning disc. **Pits** and **lands** reflect the light differently, giving 1s and 0s.
- To write, a laser changes the surface of a recordable disc.
- Examples: **CD** (about 700 MB), **DVD** (4.7 GB), **Blu-ray** (25 GB per layer).
- Cheap and light to post, but low capacity, slow and easily scratched. Downloads and flash drives have largely replaced it.

**5 · Calculate**
A 4,000 GB hard disk costs £80. A 2,000 GB SSD costs £120. How many times more does the SSD cost per gigabyte?
Answer: 3  (accepted: [[3.0, 3.0]])
Feedback (correct): Yes. Hard disk: 8,000p ÷ 4,000 GB = 2p per GB. SSD: 12,000p ÷ 2,000 GB = 6p per GB. 6 ÷ 2 = 3 times as much.
Feedback (wrong): Work out pence per gigabyte for each. Hard disk: 8,000p ÷ 4,000 GB = 2p per GB. SSD: 12,000p ÷ 2,000 GB = 6p per GB. The SSD costs 6 ÷ 2 = 3 times as much per gigabyte. (Comparing only the prices, £120 ÷ £80 = 1.5, ignores capacity.)

**8 · Quick check**
A travel photographer copies 60 GB of photos a day to a small device kept loose in a rucksack. Which is the best choice?
- A. ✓ A portable SSD, as it is fast and has no moving parts — *Right: it has the capacity, copies quickly and survives being knocked about.*
- B. A portable hard disk, as it is the cheapest per gigabyte — *Cheap, but its moving parts can be damaged by knocks in a rucksack.*
- C. Blank DVDs, as they are cheap and light to carry — *A DVD holds only 4.7 GB, so 60 GB would need 13 discs a day, and they scratch easily.*
- D. A USB flash drive, as small drives hold the most data — *Small size does not mean large capacity; a portable SSD holds more and is faster.*

**9 · Mission check**
One storage firm runs 300,000+ spinning hard disks. Why **not** SSDs?
- A. Hard disks read large files faster than SSDs — *SSDs are faster: they have no head to move or platter to spin up.*
- B. SSDs lose their data when switched off — *SSDs use flash memory, which is non-volatile.*
- C. ✓ Hard disks hold far more for the money — *Right: for huge amounts of data, cost per gigabyte matters most.*
- D. SSDs only work in laptops, not servers — *SSDs are widely used in servers; the reason is cost, not compatibility.*
Shown after answering: When you store vast amounts of data, cost per gigabyte matters most. Hard disks give far more capacity for the money. SSDs are faster and tougher, so they are used where speed matters, such as in laptops.

### Recap

- RAM is volatile and holds what is in use now; ROM is non-volatile and holds the start-up instructions.
- Registers and cache are small, fast, volatile memory close to the CPU.
- When RAM is full, virtual memory on secondary storage takes the overflow, but swapping is slow.
- Secondary storage is non-volatile and keeps data for the long term; choose it by capacity, speed, portability, durability, reliability and cost.
- Magnetic: huge and cheap per gigabyte, but moving parts. Solid state: fast and robust, but dearer per gigabyte.
- Optical discs are read by a laser (pits and lands): cheap but low capacity.

---

## Data storage and compression  (OCR GCSE Computer Science (J277) · 1.2.4–1.2.5)
Page: `computer-science-gcse-ocr-data-storage-compression-mini-lesson.html` (NEW)

### Mission 1: Web colours look like #FF8C00. Why letters and numbers?  [module D1]

*Guess chips:* It's binary written in a shorter form · The letters are colour names in code · The computer stores the colour as text · I'm not sure yet

**1 · Teach — Everything is binary**
> Diagram D1: A row of 8 switches (off/on) above the bits 0 1 0 0 0 0 0 1, with three arrows from the same pattern to "65", "A" and "a pixel colour"
- A computer is built from billions of tiny switches, each off or on. So it stores and processes everything in **binary**: 0s and 1s.
- Numbers, text, images, sound and program **instructions** are all binary patterns.
- One pattern can mean a number, a letter or a colour.
- A **bit** is a single 0 or 1.

**2 · Teach — Binary place values**
> Diagram D2: 8-bit place-value grid: header row 128 64 32 16 8 4 2 1; bit row 0 1 1 0 1 0 0 1; columns holding 1 highlighted (teal) with their values gathered below: 64 + 32 + 8 + 1 = 105. Labels "MSB" under the 128 column and "LSB" under the 1 column.
- **Denary** (base 10) columns go 1, 10, 100. **Binary** (base 2) columns double: 1, 2, 4, 8…
- Add columns holding 1: 0110 1001 = 64 + 32 + 8 + 1 = 105.
- Leftmost bit: **most significant bit (MSB)**. Rightmost: **least significant bit (LSB)**.
- Each extra bit doubles the patterns: 8 bits give 256 (0 to 255).
- Leading zeros change nothing: 11010 = 0001 1010.
| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|---|---|---|---|---|---|---|---|
| 0 | 1 | 1 | 0 | 1 | 0 | 0 | 1 |

**3 · Calculate**
Convert the binary number 1011 0110 to denary.
Answer: 182  (accepted: [[182.0, 182.0]])
Feedback (correct): Yes. 128 + 32 + 16 + 4 + 2 = 182.
Feedback (wrong): Write the place values 128, 64, 32, 16, 8, 4, 2, 1 above the bits. The 1s sit under 128, 32, 16, 4 and 2, so 128 + 32 + 16 + 4 + 2 = 182. If you got 109, you read the place values from the wrong end.

**4 · Answer**
Convert the denary number 200 to 8-bit binary.
Accept: 1100 1000 | 11001000
Feedback (correct): Right. 200 = 128 + 64 + 8, so 1100 1000.
Feedback (wrong): Work from the left. 128 fits into 200 (72 left), 64 fits (8 left), 32 and 16 do not, 8 fits (0 left). Put 1s under 128, 64 and 8: 1100 1000. Give all 8 bits.

**6 · Teach — Hexadecimal**
> Diagram D3: Nibble split: 1101 0111 split into 1101 and 0111 with a gap, each nibble labelled with its place values 8 4 2 1, then "13 → D" and "7 → 7", giving D7. Beside it a key strip 10 11 12 13 14 15 / A B C D E F. On screen 9 a second panel compares length: 1010 0101 1111 0000 (16 characters) against A5F0 (4 characters).
- **Hexadecimal** (base 16) has sixteen digits: 0–9, then **A–F for 10–15**.
- One hex digit is exactly **4 bits** (a **nibble**), as 4 bits give 16 patterns.
- Binary to hex: split into nibbles from the right: 1101 0111 → D7.
- Hex to binary: each digit becomes 4 bits: 3F → 0011 1111.
- Hex to denary: 8C = 8 × 16 + 12 = 140.
- Denary to hex: 200 ÷ 16 = 12 r 8, so C8.

**7 · Answer**
Convert the binary number 1011 1110 to hexadecimal.
Accept: BE
Feedback (correct): Correct. 1011 = 11 = B and 1110 = 14 = E, so BE.
Feedback (wrong): Split into nibbles: 1011 and 1110. 1011 = 8 + 2 + 1 = 11, which is B. 1110 = 8 + 4 + 2 = 14, which is E. So the answer is BE, not 1114 (each nibble must be a single hex digit).

**8 · Calculate**
Convert the hexadecimal number A7 to denary.
Answer: 167  (accepted: [[167.0, 167.0]])
Feedback (correct): Yes. A = 10, so 10 × 16 + 7 = 167.
Feedback (wrong): The left digit is worth 16s and the right digit 1s. A = 10, so 10 × 16 + 7 = 160 + 7 = 167. If you got 122, you swapped the digits (7 × 16 + 10).

**9 · Teach — Why use hex?**
> Diagram D3: Nibble split: 1101 0111 split into 1101 and 0111 with a gap, each nibble labelled with its place values 8 4 2 1, then "13 → D" and "7 → 7", giving D7. Beside it a key strip 10 11 12 13 14 15 / A B C D E F. On screen 9 a second panel compares length: 1010 0101 1111 0000 (16 characters) against A5F0 (4 characters).
- Computers never store hex. It is a **shorthand for binary** for humans.
- Hex is much **shorter**: 8 bits become 2 hex digits.
- It is **easier to read, remember and copy** without mistakes than long strings of 0s and 1s.
- Converting hex to binary is quicker than converting denary to binary, because each digit maps to 4 bits.
- Uses: **colour codes** in web pages, **MAC addresses**, **memory addresses** and **error codes**.

**10 · Mission check**
Why is a web colour such as #FF8C00 written with letters and numbers?
- A. The letters are short names for colours, such as F for a fiery shade. — *Hex letters are digits standing for the values 10 to 15, not colour names.*
- B. The letters let the code store more colours than binary could. — *Hex stores nothing extra: every hex code is exactly the same binary pattern written more briefly.*
- C. ✓ It is hexadecimal: a short way to write the colour's binary. — *Right: each hex digit stands for 4 bits, so six digits replace 24 bits.*
- D. The computer stores the colour code as six text characters. — *The colour is held as a binary number; the hex form is only for humans to read and type.*
Shown after answering: #FF8C00 is hexadecimal. Each pair of hex digits is one byte for red, green and blue: FF = 1111 1111 = 255, 8C = 1000 1100 = 140, 00 = 0. Six hex digits are far easier for people to read and copy than the 24 bits the computer actually stores.

### Mission 2: How can a computer multiply by 8 without doing any multiplying?  [module D2]

*Guess chips:* Move every bit 3 places left · Move every bit 8 places left · Move every bit 3 places right · I'm not sure yet

**1 · Teach — Adding in binary**
> Diagram D1: Column addition of 0100 1011 + 0010 0110 = 0111 0001 laid out in 8 columns with place values on top; carry bits in small orange digits above the columns where they arise (carries go into the 4s, 8s and 16s columns); result row in teal. On screen 3 (AQA only) the three-row sum 0001 0101 + 0000 0110 + 0000 0011 = 0001 1110 with its carries in orange.
- Add column by column from the right, carrying like denary addition.
- 0 + 0 = 0 · 0 + 1 = 1 · 1 + 1 = **10** (write 0, carry 1) · 1 + 1 + 1 = **11** (write 1, carry 1).
- Example: 0100 1011 + 0010 0110 = 0111 0001 (75 + 38 = 113).
- Check by converting each number to denary.

**2 · Answer**
Add these two 8-bit binary numbers: 0101 1011 + 0011 0110. Give the 8-bit answer.
Accept: 1001 0001 | 10010001
Feedback (correct): Right. 91 + 54 = 145, which is 1001 0001.
Feedback (wrong): Work from the right and write carries above each column. Columns with two 1s give 0 carry 1; columns with three 1s (two bits plus a carry) give 1 carry 1. The answer is 1001 0001. Check: 91 + 54 = 145 = 128 + 16 + 1.

**5 · Teach — Overflow**
> Diagram D2: An 8-box register under the sum 1111 0000 + 0010 0000. The result 1 0001 0000 is drawn with the 9th bit (red) hanging outside the left edge of the register with a "lost" label; the register shows 0001 0000 = 16 and the true answer 272 is crossed out beside it.
- A register has a fixed number of bits: 8 bits hold at most 255.
- A result that needs more bits than are available causes an **overflow error**.
- 1111 0000 + 0010 0000 = **1** 0001 0000 (272). The 9th bit is lost, leaving 0001 0000 = 16.

**6 · Calculate**
A program adds 1100 1000 and 0110 0100 in an 8-bit register. The 9th bit is lost. What denary value is left in the register?
Answer: 44  (accepted: [[44.0, 44.0]])
Feedback (correct): Yes. 200 + 100 = 300 = 1 0010 1100. Without the 9th bit (worth 256) the register holds 0010 1100 = 44. That is an overflow error.
Feedback (wrong): 1100 1000 = 200 and 0110 0100 = 100, so the true sum is 300 = 1 0010 1100. That needs 9 bits. The 9th bit (worth 256) is lost, leaving 0010 1100 = 300 − 256 = 44.

**7 · Teach — Binary shifts**
> Diagram D3: Two 8-box registers for 0000 1101 (13). Left shift by 1: arrows slant one box left; a 0 enters at the right (grey); result 0001 1010 = 26. Right shift by 1: arrows slant right; a 0 enters at the left; the 1 that falls off the right is shown faded with a "lost" label; result 0000 0110 = 6.
- Binary columns double in value from right to left.
- A **binary shift** slides every bit left or right. Bits pushed off the end are **lost**; gaps fill with **0**.
- Left 1 place: × 2. Right 1 place: ÷ 2, remainder lost. Use: fast × or ÷ by 2, 4, 8.
- 0000 1101 (13) shifted left 1 → 26; right 1 → 6.
- This is a **logical shift**.

**8 · Answer**
Shift 0001 0110 three places to the left. Give the 8-bit result.
Accept: 1011 0000 | 10110000
Feedback (correct): Right. Every bit moves 3 places left and three 0s fill the right: 22 × 8 = 176.
Feedback (wrong): Move every bit 3 places to the left and fill the 3 empty places on the right with 0s: 0001 0110 → 1011 0000. Check: 22 × 2³ = 22 × 8 = 176. If you got 0000 0010, you shifted right.

**9 · Calculate**
Shift 0110 1101 (109) two places to the right. What is the result in denary?
Answer: 27  (accepted: [[27.0, 27.0]])
Feedback (correct): Correct. 0110 1101 → 0001 1011 = 27. The two 1s pushed off the right are lost, so the result is 109 ÷ 4 rounded down.
Feedback (wrong): Move every bit 2 places right, filling the left with 0s: 0001 1011 = 16 + 8 + 2 + 1 = 27. Dividing by 4 gives 27.25, but a shift cannot keep fractions: the bits that fall off are lost. If you got 180, you shifted left.

**10 · Quick check**
1110 0000 (224) is shifted 2 places left in an 8-bit register. What is the result?
- A. 11 1000 0000 (896), because the register grows to fit — *A register has a fixed size, so it cannot gain extra bits.*
- B. ✓ 1000 0000 (128), because two 1s are lost off the left — *Right: the two leftmost 1s fall off, so the result is not 224 × 4.*
- C. 0011 1000 (56), because a shift of 2 divides by 4 — *That is a shift to the right; a left shift moves bits towards the MSB.*
- D. 1000 0011 (131), because lost bits wrap round to the right — *Bits pushed off the end are lost, and 0s fill the empty places.*

**11 · Mission check**
How can a computer multiply a number by 8 without doing any multiplying?
- A. Move every bit 8 places to the left — *Each place doubles the value, so 8 places would multiply by 256.*
- B. Move every bit 3 places to the right — *Shifting right divides: 3 places right divides by 8.*
- C. Move every bit 4 places to the left — *Each place doubles the value, so 4 places would multiply by 16.*
- D. ✓ Move every bit 3 places to the left — *Right: each place left doubles the value, and 2 × 2 × 2 = 8.*
Shown after answering: Shifting every bit one place left doubles a binary number, because each column is worth twice the one to its right. Three places left doubles it three times: × 8. So 0001 0110 (22) becomes 1011 0000 (176), as long as no 1s fall off the end.

### Mission 3: How does a computer store the letter A if it can only store numbers?  [module D4]

*Guess chips:* It stores an agreed number code for A · It stores a tiny picture of the letter · It stores A's place in the alphabet, 1 · I'm not sure yet

**1 · Teach — Characters as codes**
> Diagram D1: A keyboard key "A" → a binary pattern in a memory box (shown as "0 1 0 0 0 0 0 1" without any denary label) → a phone screen drawing "A". A dashed box labelled "character set" connects the two ends, with the caption "both devices use the same table".
- Each **character** (letter, digit, symbol, space) is stored as a binary number: its **character code**.
- A **character set** is the agreed list of characters a computer can use, each with its own code.
- Using a **standard** character set means text keeps its meaning when it moves between programs and devices.
- Typing A sends A's code; the screen looks up the code to draw the A.

**2 · Teach — ASCII**
> Diagram D2: ASCII table excerpt: three short blocks, each with columns Character · Denary · Binary (7-bit; for O show 8-bit with leading 0): digits '0' 48, '1' 49, '2' 50; capitals A 65, B 66, C 67, then "…", Z 90; lower case a 97, b 98, c 99, then "…", z 122. Arrows down each block labelled "+1".
- **ASCII** (American Standard Code for Information Interchange) uses **7 bits** per character.
- 7 bits give 2⁷ = **128** codes (0 to 127): English letters, digits, punctuation, space and control codes such as Enter.
- More bits per character means more possible characters.
- Exam questions write ASCII codes in 8 bits: 'A' = 0100 0001.

**3 · Teach — Codes run in order**
> Diagram D2: ASCII table excerpt: three short blocks, each with columns Character · Denary · Binary (7-bit; for O show 8-bit with leading 0): digits '0' 48, '1' 49, '2' 50; capitals A 65, B 66, C 67, then "…", Z 90; lower case a 97, b 98, c 99, then "…", z 122. Arrows down each block labelled "+1".
- Codes are grouped and **run in sequence**: A = 65, B = 66, C = 67 … Z = 90.
- Lower case runs on from a = 97; the digits from '0' = 48.
- Know one code and you can work out its neighbours: 'C' = 65 + 2 = 67.
- The character '7' has code 55. It is not the number 7.

**4 · Calculate**
In ASCII, 'A' has the code 65. What is the code for 'H'?
Answer: 72  (accepted: [[72.0, 72.0]])
Feedback (correct): Right. H is 7 letters after A, so 65 + 7 = 72.
Feedback (wrong): Codes run in alphabetical order. Count on from A: B is 66, C is 67 … H is 7 letters after A, so 65 + 7 = 72. If you got 73, you counted A itself as one step.

**5 · Answer**
In ASCII, 'a' is 0110 0001. What is the binary code for 'd'?
Accept: 0110 0100 | 01100100 | 110 0100 | 1100100
Feedback (correct): Correct. 'd' is 3 after 'a': 97 + 3 = 100 = 0110 0100.
Feedback (wrong): 0110 0001 = 97. 'd' is 3 letters after 'a', so its code is 100. 100 = 64 + 32 + 4 = 0110 0100. If you got 0110 0011, you counted only to 'c'.

**6 · Answer**
In ASCII, 'A' is 65. Which word do the codes 66 69 68 spell? Type it in capitals.
Accept: BED
Feedback (correct): Correct. 66 = B, 69 = E, 68 = D.
Feedback (wrong): Count on from A = 65: 66 is one after A, so B. 69 is four after A, so E. 68 is three after A, so D. The word is BED. If you got CFE, you were one letter out each time: 66 is the letter straight after A.

**7 · Teach — Unicode**
> Diagram D3: A bar comparing character counts: ASCII 128 vs Unicode about 160,000 (Unicode 17.0: 159,801 [S7]) drawn with a broken axis, plus sample Unicode characters: Arabic letter, Chinese character, Greek letter, an emoji. Small note: "Unicode 0–127 = ASCII".
- ASCII's 128 codes cannot cover other alphabets. **Unicode** aims to code every writing system, plus symbols and **emoji**: about 160,000 characters so far [S7].
- Unicode uses **more bits per character** than ASCII, so text takes more storage.
- Its first 128 codes are the **same as ASCII**: 'A' is 65 in both.

**8 · Quick check**
A messaging app must show Arabic, Chinese and emoji. Which character set should it use?
- A. ASCII, because its 7-bit codes take up the least storage — *Saving storage is no use if the characters cannot be represented at all.*
- B. Unicode, because it uses fewer bits per character than ASCII — *Unicode uses more bits per character, not fewer.*
- C. ASCII, because it has a code for every keyboard in every country — *ASCII has only 128 codes, mainly for English.*
- D. ✓ Unicode, because it can code far more characters — *Right: Unicode covers many alphabets and emoji, at the cost of more bits per character.*

**9 · Mission check**
How does a computer store the letter A when it can only store numbers?
- A. ✓ It stores A's agreed number code from a character set — *Right: A is stored as its character code, in binary.*
- B. It stores a tiny picture of the letter made of pixels — *Pixels are only used to draw the letter on screen; the stored text is a code.*
- C. It stores A's place in the alphabet, so A is 1 — *Character sets do not start letters at 1: in ASCII, A is 65.*
- D. It stores the letter on a special chip that only holds text — *Memory only holds binary; there is no separate store for letters.*
Shown after answering: Every character has an agreed number in a character set. In ASCII, A is 65, stored as the binary pattern 100 0001. Because every device uses the same standard, the 65 sent by one phone is drawn as A on another.

### Mission 4: Double a photo's width and height: how much bigger is the file?  [module D5]

*Guess chips:* Twice as big · Four times as big · About the same size · I'm not sure yet

**1 · Teach — Pictures made of dots**
> Diagram D1: A small cartoon cat face (16 x 16 pixels) shown smooth on the left, and zoomed on the right so the square pixels and faint grid lines are visible. One pixel outlined in orange and labelled "pixel". Width arrow "16 pixels" along the top, height arrow "16 pixels" down the side, caption {{A: "image size 16 x 16" \
- A **pixel** (**picture element**) is a single point in an image.
- A **bitmap** is a grid of pixels. Each pixel's colour is stored as a binary code.
- **Resolution** is the number of pixels, written width x height, e.g. 800 x 600.
- More pixels: more detail, but more data to store.

**2 · Teach — Colour depth**
> Diagram D2: Left: a 4 x 4 1-bit image (pattern by row: 1001, 0110, 0110, 1001, black = 1), with the bit pattern written beside each row in monospace. Right: a small table "colour depth → colours": 1 bit → 2, 2 bits → 4, 8 bits → 256, 24 bits → 16,777,216, with swatch strips showing 2, 4 and 8-ish sample colours. Key: "black = 1, white = 0".
- **Colour depth** is the number of bits used to store each pixel's colour.
- n bits give 2ⁿ colours: 1 bit gives 2, 8 bits 256, 24 bits about 16.7 million.
- In a 1-bit image, 1 could mean black and 0 white: each row is a bit pattern, and a bit pattern can be drawn back as pixels.
- Higher colour depth: more colours and better quality, but a bigger file.

**3 · Answer**
> Diagram D3: One row of 8 square pixels, left to right: white, black, black, white, white, black, white, black. Pixel positions numbered 1 to 8 underneath. Key: "black = 1, white = 0".
This row comes from a 1-bit image where black = 1 and white = 0. Reading left to right, write the bit pattern for the row.
Accept: 01100101 | 0110 0101
Feedback (correct): Right. Each pixel is one bit: white 0, black 1, black 1, white 0, white 0, black 1, white 0, black 1.
Feedback (wrong): Go pixel by pixel from the left: white, black, black, white, white, black, white, black gives 0 1 1 0 0 1 0 1, so the pattern is 01100101.

**4 · Teach — Working out file size**
- File size in bits = width x height x colour depth. Divide by 8 for bytes.
- Example: 800 x 600 pixels at 24 bits is 800 x 600 x 24 = 11,520,000 bits = 1,440,000 bytes.
- No calculator? Write the whole expression, then cancel before multiplying.
- Real files also hold **metadata** (e.g. width, height, colour depth), so they are a little bigger.
- Text file size = bits per character x number of characters.

**5 · Calculate**
bytes

An image is 200 x 100 pixels with a colour depth of 8 bits. What is its file size?
Answer: 20000  (accepted: [[20000.0, 20000.0]])
Feedback (correct): Right. 200 x 100 x 8 = 160,000 bits, and 160,000 ÷ 8 = 20,000 bytes.
Feedback (wrong): Multiply width x height x colour depth: 200 x 100 x 8 = 160,000 bits. Then divide by 8 for bytes: 160,000 ÷ 8 = 20,000 bytes.

**6 · Teach — Units of data**
> Diagram D4: A unit "staircase": bit → nibble → byte → kilo → mega → giga → tera, with the multiplier on each step. {A}: bit, byte (x 8), kB (x 1,000), MB, GB, TB (each x 1,000); no nibble. {O}: as A but with the symbol KB (not kB), plus nibble (4 bits) between bit and byte, and PB (x 1,000) at the top; small note "1,024 also accepted". {E I}: nibble, byte, KiB, MiB, GiB, TiB with x 1,024 per step ({I} adds a second, lighter staircase kB, MB, GB, TB with x 1,000). {C}: as E plus PiB, EiB. {Q}: names kilobyte (KB), megabyte (MB), gigabyte (GB), terabyte (TB), petabyte (PB), each x 1,024.
- A **bit** (b) is a single 0 or 1. A **byte** (B) is 8 bits.
- A **nibble** is 4 bits.
| Unit | Symbol | Size |
|---|---|---|
| kilobyte | KB | 1,000 bytes |
| megabyte | MB | 1,000 KB |
| gigabyte | GB | 1,000 MB |
| terabyte | TB | 1,000 GB |
- 1 **petabyte** (PB) = 1,000 TB.
- Each step up is x 1,000, so divide by 1,000 to go up one unit.
- OCR also accepts 1,024 instead of 1,000 for conversions and calculations.

**8 · Calculate**
KB

A photo file is 2,048,000 bytes. What is its size in kilobytes?
Answer: 2048  (accepted: [[2048.0, 2048.0], [2000.0, 2000.0]])
Feedback (correct): Right. 2,048,000 ÷ 1,000 = 2,048 KB. Dividing by 1,024 gives 2,000, which OCR also accepts.
Feedback (wrong): Going up from bytes to kilobytes, divide by 1,000: 2,048,000 ÷ 1,000 = 2,048 KB.

**10 · Calculate**
photos

A camera saves every photo as exactly 4 MB. How many photos fit on an empty 1 GB memory card?
Answer: 250  (accepted: [[250.0, 250.0], [256.0, 256.0]])
Feedback (correct): Right. 1 GB = 1,000 MB, and 1,000 ÷ 4 = 250 photos. Using 1 GB = 1,024 MB gives 256, which OCR also accepts.
Feedback (wrong): Put both sizes in the same unit first: 1 GB = 1,000 MB. Then 1,000 ÷ 4 = 250 photos.

**12 · Mission check**
Double a photo's width and height: how much bigger is the file?
- A. Twice as big, because the photo is now twice as wide. — *The height doubles as well, so the number of pixels goes up by more than 2 times.*
- B. Eight times as big, as the colour depth doubles as well. — *Resizing does not change the colour depth; each pixel still uses the same number of bits.*
- C. ✓ Four times as big, as there are four times as many pixels. — *Right. 2 x the width and 2 x the height gives 2 x 2 = 4 times as many pixels.*
- D. About the same size, because the colour depth is unchanged. — *The bits per pixel stay the same, but there are many more pixels to store.*
Shown after answering: File size = width x height x colour depth. Doubling the width and the height gives 2 x 2 = 4 times as many pixels, each with the same colour depth, so the file needs 4 times as many bits.

### Mission 5: How can a list of numbers turn into a song?  [module D6]

*Guess chips:* It stores the name of each note played · It measures the sound wave thousands of times a second · It stores a picture of the sound wave · I'm not sure yet

**1 · Teach — Sound is analogue**
> Diagram D1: A smooth analogue sound wave (about 1.5 cycles, blue) on axes "amplitude" (vertical) and "time" (horizontal). Evenly spaced vertical dashed lines with an orange dot where each meets the wave (about 12 samples); one dot labelled "sample", with its binary value shown, e.g. 101.
- Sound is a wave that changes smoothly and continuously: it is **analogue**.
- A computer can only store binary, so the sound must be converted to **digital** form.
- To do this, the wave's height (**amplitude**) is measured at regular moments. Each measurement is a **sample**: the amplitude at a point in time.
- Each sample is stored as a binary number.

**2 · Teach — Sample rate and bits per sample**
> Diagram D2: Two panels with the same wave. Top: low sample rate (6 samples), the rebuilt stepped/joined shape in orange is a poor match. Bottom: high sample rate (24 samples), the orange shape closely follows the wave. A side inset shows levels: 2 bits = 4 levels vs 3 bits = 8 levels. {E}: one gap between two sample lines marked with a bracket "sample interval".
- **Sample rate**: samples taken per second, in **hertz** (Hz). Music is often sampled 44,100 times a second [S7].
- **Bit depth** (or sample resolution): bits used to store each sample.
- Raise either one: the sound is closer to the original, but the file is bigger.

**3 · Quick check**
> Diagram D3: Optional: the same wave sampled at two rates labelled "22,050 Hz" and "44,100 Hz" (schematic, not to scale), with the second showing twice as many dots in the same time.
A recording app changes its sample rate from 22,050 Hz to 44,100 Hz. Nothing else changes. What happens?
- A. ✓ The sound is closer to the original and the file is larger. — *Right. More samples each second follow the wave more closely, and each extra sample needs storing.*
- B. Each sample can now store more possible amplitude values. — *That is what more bits per sample does; the sample rate only changes how often samples are taken.*
- C. The sound is closer to the original and the file is the same. — *Twice as many samples a second means twice as many to store, so the file doubles in size.*
- D. The recording plays back at twice its original speed. — *Playback uses the same sample rate it was recorded with, so the speed does not change.*

**4 · Teach — Working out sound file size**
- File size in bits = sample rate x bit depth x length in seconds.
- Divide by 8 to get bytes.
- Example: 1 second at 44,100 Hz and 16 bits is 44,100 x 16 = 705,600 bits.
- Without a calculator, write the whole expression first, then cancel before you multiply.
- These questions assume one channel (mono) unless they say otherwise.

**5 · Calculate**
bytes

A voice memo is sampled at 8,000 Hz with a bit depth of 8 bits. It lasts 10 seconds. What is its file size?
Answer: 80000  (accepted: [[80000.0, 80000.0]])
Feedback (correct): Right. 8,000 x 8 x 10 = 640,000 bits, and 640,000 ÷ 8 = 80,000 bytes.
Feedback (wrong): Multiply sample rate x bits per sample x seconds: 8,000 x 8 x 10 = 640,000 bits. Then divide by 8: 640,000 ÷ 8 = 80,000 bytes.

**6 · Calculate**
seconds

A sound file is 96,000 bytes. It was sampled at 8,000 Hz with 8 bits per sample. How long is the recording?
Answer: 12  (accepted: [[12.0, 12.0]])
Feedback (correct): Right. 96,000 bytes x 8 = 768,000 bits, and 768,000 ÷ (8,000 x 8) = 12 seconds.
Feedback (wrong): Turn the size into bits: 96,000 x 8 = 768,000 bits. Each second uses 8,000 x 8 = 64,000 bits, so 768,000 ÷ 64,000 = 12 seconds.

**7 · Calculate**
KB

A clip is sampled at 32,000 Hz with a bit depth of 16 bits. It lasts 64 seconds. What is its file size in kilobytes?
Answer: 4096  (accepted: [[4096.0, 4096.0], [4000.0, 4000.0]])
Feedback (correct): Right. 32,000 x 16 x 64 = 32,768,000 bits = 4,096,000 bytes, and 4,096,000 ÷ 1,000 = 4,096 KB. Dividing by 1,024 gives 4,000, which OCR also accepts.
Feedback (wrong): Bits: 32,000 x 16 x 64 = 32,768,000. Bytes: ÷ 8 = 4,096,000. Kilobytes: ÷ 1,000 = 4,096 KB.

**9 · Quick check**
> Diagram D4: Two stepped versions of one wave: "16 bits: 65,536 levels" (drawn as very fine steps) and "8 bits: 256 levels" (visibly coarser steps, exaggerated, labelled "schematic").
To save space, an app stores samples with 8 bits instead of 16. What is the effect?
- A. Half as many samples are taken each second, so the file halves. — *That describes halving the sample rate; the number of samples per second has not changed.*
- B. ✓ Samples are rounded to 256 levels, not 65,536, so quality drops. — *Right. 2⁸ = 256 levels instead of 2¹⁶ = 65,536, so amplitudes are stored less accurately, and the file halves.*
- C. Each sample keeps its exact amplitude, but the file is half the size. — *With fewer bits there are fewer levels, so many amplitudes must be rounded to the nearest one.*
- D. The recording becomes shorter, because there are fewer bits in total. — *The length in seconds is unchanged; each second just uses fewer bits.*

**10 · Mission check**
How can a list of numbers turn into a song?
- A. Each number stores the name of a note, which is played back in turn. — *Recorded sound stores the wave itself, not note names, so voices and noises can be stored too.*
- B. The numbers record a picture of the whole wave, saved like a photo. — *The wave is not stored as an image; it is measured at separate moments.*
- C. The numbers set how loud the whole song is, then speakers add the tune. — *One volume level could not hold a tune; every moment of the wave needs its own measurement.*
- D. ✓ Each number is the wave's height at one moment, many times a second. — *Right. Samples taken at a fixed rate, each stored in binary, rebuild the shape of the wave.*
Shown after answering: The sound wave is sampled: its amplitude is measured thousands of times a second and each sample is stored as a binary number. Played back in order at the same rate, the numbers rebuild the shape of the wave, so a higher sample rate and more bits per sample give a closer copy and a bigger file.

### Mission 6: How can a file shrink but still open exactly as before?  [module D7]

*Guess chips:* It stores repeated patterns once, with a count · It quietly deletes detail you won't notice · It packs the bits closer together on the disk · I'm not sure yet

**1 · Teach — Why compress?**
- **Compression** makes a file smaller, so it uses fewer bits.
- Smaller files need less **storage space**.
- They take less time to send or download and use less **bandwidth**.
- Common cases: streaming video and music, web pages, email attachments, photos on a phone.

**2 · Teach — Squeezing out repetition**
> Diagram D1: A row of 13 square pixels: 6 white, 3 black, 4 white. Below, curly brackets group each run with labels "6 W", "3 B", "4 W". An arrow back up labelled "rebuilt exactly".
- Data often repeats: a row of 6 white pixels, then 3 black, then 4 white.
- Instead of storing all 13 pixels, store each run as a count and a value: 6 W, 3 B, 4 W.
- The original can be rebuilt **exactly**, bit for bit. Compression that loses nothing is **lossless**.
- The more repetition there is, the more the file shrinks.

**3 · Quick check**
Two images are the same size. One is a logo with large areas of flat colour. The other is TV static, where neighbouring pixels are random colours. Which shrinks more using repetition, and why?
- A. The static image, because random pixels have more detail to remove. — *Removing detail is a different idea; repetition-based methods need runs of the same value.*
- B. ✓ The logo, because flat colour makes long runs of the same value. — *Right. Long runs can each be stored as one count and one value.*
- C. Both by the same amount, because both have the same number of pixels. — *The pixel count is equal, but how much they shrink depends on how much the data repeats.*
- D. The static image, because random colours use fewer bits per pixel. — *Both use the same colour depth; random pixels give runs of length 1, so little is saved.*

**6 · Teach — Lossy and lossless**
> Diagram D3: Two panels from the same original picture of a flower. Lossless: smaller file icon, picture identical, label "rebuilt exactly". Lossy: much smaller file icon, picture slightly blocky (exaggerated), label "data removed for good". {I}: tags "JPEG" on the lossy panel.
- **Lossy** compression permanently removes data, usually detail people are unlikely to notice.
- Example: a photo stored with fewer colours or a song with sounds we barely hear removed.
- Lossy: much smaller files, but lower quality and the original cannot be got back.
- **Lossless**: the original is rebuilt exactly, but the file is not as small. Use it for text, program files and data.

**7 · Quick check**
Which file must be compressed using lossless compression?
- A. A holiday video being streamed to a phone. — *A small loss of detail in video is rarely noticed, so lossy is normally used.*
- B. A photo for a social media post. — *Photos are usually compressed with lossy methods; the lost detail is hard to see.*
- C. A song for a music streaming app. — *Music is often compressed lossily; the sounds removed are ones listeners barely notice.*
- D. ✓ A program file being downloaded. — *Right. Losing even one bit of a program could stop it working, so it must be rebuilt exactly.*

**10 · Mission check**
How can a file shrink but still open exactly as before?
- A. It deletes detail you are unlikely to notice, like faint colours. — *That would change the file, so it could not open exactly as before.*
- B. It packs the same bits more tightly onto the storage device. — *The number of bits must go down; a bit takes the same space wherever it sits.*
- C. It keeps only every other byte and guesses the ones in between. — *Guessed bytes may be wrong, so the original could not be rebuilt exactly.*
- D. ✓ It stores each repeated pattern once, along with a count. — *Right. Nothing is thrown away, so the original can be rebuilt bit for bit.*
Shown after answering: Data usually contains repetition. Lossless compression stores repeated patterns more efficiently, for example as a count and a value, so the file uses fewer bits and the original can be rebuilt exactly.

### Recap

- Computers store all data and instructions as binary. Binary place values double: 1, 2, 4 … 128, so 8 bits hold 0 to 255.
- One hex digit = 4 bits (a nibble). Hex digits A–F mean 10–15.
- Convert hex to denary with ×16: 8C = 8 × 16 + 12 = 140.
- Hex is a shorthand for humans: shorter, easier to read and fewer copying mistakes.
- Binary addition: 1 + 1 = 10 and 1 + 1 + 1 = 11, so write the right digit and carry the left.
- A result too big for the bits available causes an overflow error.
- Shift left n places: × 2ⁿ. Shift right n places: ÷ 2ⁿ, rounded down. Bits pushed off the end are lost.
- A character set is an agreed list of characters with a binary code for each. Codes run in order, so B is one more than A.
- ASCII uses 7 bits: 128 characters, enough for English.
- Exam questions show ASCII codes in 8 bits.
- Unicode uses more bits per character to cover far more characters, including other alphabets and emoji; its first 128 codes match ASCII.
- A bitmap is a grid of pixels; colour depth is the bits per pixel, and n bits give 2ⁿ colours.
- File size (bits) = width x height x colour depth; divide by 8 for bytes.
- Each unit up (KB, MB, GB, TB) is x 1,000.
- A sample is the amplitude of the wave at one point in time, stored in binary.
- Sample rate = samples per second (Hz); bit depth = bits per sample. Both raise quality and file size.
- File size (bits) = sample rate x bits per sample x seconds.
- Compression makes files smaller: less storage, faster transfer, less bandwidth.
- Lossless compression rebuilds the original exactly by storing repetition efficiently.
- Lossy compression permanently removes data for much smaller files.

---

## Networks, connections and protocols  (OCR GCSE Computer Science (J277) · 1.3)
Page: `computer-science-gcse-ocr-networks--topologies-mini-lesson.html`

### Mission 1: If networks spread viruses, why does every school connect its PCs?  [module N1]

*Guess chips:* The sharing and backups are worth the risk · Networked PCs each run faster · A network stops viruses spreading · I'm not sure yet

**1 · Teach — Why connect computers?**
> Diagram D1: Left: five stand-alone PCs, each with its own printer and its own internet line (grey). Right: the same five PCs cabled to one switch, which links to one shared printer, one file server with a backup tape/drive icon, and one internet connection (router). Labels: "shared printer", "file server + backups", "one internet connection".
- A **computer network** is two or more computers (or other devices) connected so they can share data and resources.
- Joining them brings gains, and it brings costs and risks:
| Gains | Costs and risks |
|---|---|
| Share files and data from any computer | Hardware (cables, switches, servers) costs money |
| Share printers and one internet connection | Needs skilled staff to set up and maintain |
| Communicate: email, messaging, shared documents | Malware can spread from one computer to others |
| Back up every computer from one place | Hackers can attack from anywhere on the network |
| Install software and updates centrally | If a central device or server fails, many users are hit |

**2 · Quick check**
A small office has five stand-alone computers. Which change would a network bring?
- A. Each computer's processor would run programs faster. — *A network links computers; it does not change how fast each processor runs.*
- B. Viruses could no longer reach any of the five computers. — *The opposite is a risk: on a network, malware can spread from one computer to the others.*
- C. ✓ One printer and one internet line could serve all five. — *Right. Sharing hardware and an internet connection is a key gain of a network.*
- D. Each computer would need its own copy of every file. — *A network removes this need: files can be stored once and opened from any computer.*

**6 · Teach — Types of network**
> Diagram D2: Nested scale picture: a PAN (phone + earbuds, labelled "PAN, a few metres") {A I only}; a school building with PCs on a switch, labelled "LAN, one site, one owner"; three LANs in different cities joined by long lines through a cloud labelled "WAN, wide area, links LANs".
- A **LAN** (local area network) covers a small area, such as one school, and is usually owned and run by one organisation.
- A **WAN** (wide area network) covers a wide geographical area and links LANs. It is often under collective or shared ownership.
- The **internet** is the biggest WAN.

**7 · Teach — Client-server and peer-to-peer**
> Diagram D3: Two panels. Left "client-server": one server in the centre, four clients with request arrows to it and response arrows back. Right "peer-to-peer": four equal computers, each linked to the others with two-way arrows, no server.
- On a **client-server** network, **servers** provide services and **clients** request and use them.
- On a **peer-to-peer** network there is no server: every computer is equal and shares its own files.
|  | Client-server | Peer-to-peer |
|---|---|---|
| Files and backups | Stored and backed up centrally | Spread across the computers |
| Security | Managed in one place | Set on each computer |
| Cost | Servers and staff are expensive | Cheap and simple to set up |
| Weak spot | If the server fails, its service stops | A computer's files vanish when it is off |

**8 · Teach — Wired or wireless?**
- **Wired** connections use cables; **wireless** connections use radio waves.
- The main wired standard is **Ethernet**; common wireless ones are **Wi-Fi** and **Bluetooth**.
- **Copper** cable is cheap for short runs. **Fibre-optic** cable carries more data over long distances with no electrical interference, but costs more.
|  | Wired | Wireless |
|---|---|---|
| Speed and bandwidth | Usually higher | Usually lower, shared by nearby devices |
| Range | Longer, especially with fibre | Limited; walls and interference weaken it |
| Latency (delay) | Lower | Higher |
| Mobility and set-up | Devices fixed; cabling costs | Devices can move; cheap to add |
| Security | Must plug in to tap it | Signals can be picked up nearby |

**9 · Quick check**
A college has 30 desktop PCs in one room, used to edit large video files stored on a server in the same building. Which connection suits them best?
- A. Bluetooth, linking each PC directly to the server. — *Bluetooth is for a few personal devices over a few metres; it is far too slow for 30 PCs moving video.*
- B. ✓ A wired LAN, cabling each PC to a switch. — *Right. The PCs don't move, so cables give the speed, reliability and low latency large video files need.*
- C. A wireless LAN, so every PC shares one access point. — *Thirty PCs sharing one wireless link would be slow for huge files, and the desktops never move anyway.*
- D. A WAN, with each PC rented its own link to the server. — *Everything is in one building, so this is a LAN; a WAN covers a wide geographical area.*

**10 · Teach — Measuring network performance**
- **Bandwidth** is the most data a connection can carry each second. Speeds are measured in **bits per second** (bps), not bytes.
- The more devices share a network, the less bandwidth each gets, so it slows down.

**13 · Mission check**
If networks spread viruses, why does every school connect its PCs?
- A. Linking PCs makes each one's processor run faster. — *A network doesn't speed up a processor; it lets computers share data and resources.*
- B. Linking PCs stops malware from reaching any of them. — *A network makes it easier for malware to spread; security measures are needed to stop it.*
- C. Every PC needs a network to run its operating system. — *A stand-alone PC runs its operating system perfectly well without a network.*
- D. ✓ The sharing and central backups are worth the risk. — *Right. The gains are large, and the risks are reduced with security measures.*
Shown after answering: A network lets a school share files, printers and one internet connection, and back up and manage every PC from one place. The risks, such as malware spreading, hardware costs and a central failure, are real, so networks are protected and maintained rather than avoided.

### Mission 2: One box fails and a whole office goes offline. How?  [module N2]

*Guess chips:* The box every cable runs to failed · One computer's cable snapped · Someone changed the Wi-Fi password · I'm not sure yet

**1 · Teach — The star topology**
> Diagram D1: Star: one switch in the centre (labelled "switch"), six PCs around it, each with its own straight cable to the switch. Arrow showing data PC A → switch → PC D.
- A **topology** is the layout of how the devices on a network are connected.
- In a **star** topology, every device has its own cable to one **central device**, usually a **switch**. All data passes through the centre, which sends it on to the right device.
| Advantages | Disadvantages |
|---|---|
| If one cable fails, only that device is cut off | If the central switch fails, the whole network fails |
| Fast and reliable: few data collisions | Lots of cable, so it can be expensive |
| Easy to add devices and to find faults | The switch can become a bottleneck when traffic is heavy |

**2 · Quick check**
On a star network of eight PCs, the cable to PC 3 is cut. What happens?
- A. Every PC loses its connection until the cable is replaced. — *That would happen if the central switch failed, but each PC has its own separate cable.*
- B. Data for PC 3 is sent round the other PCs by another path. — *In a star there is no other path: every device has just one link, to the centre.*
- C. ✓ Only PC 3 is cut off; the other seven keep working. — *Right. Each device has its own cable to the switch, so one broken cable only affects one device.*
- D. The switch slows down because it has one fewer PC to manage. — *A switch does not slow down when a device drops off; the other PCs carry on as before.*

**3 · Teach — The mesh topology**
> Diagram D2: Full mesh of 4 devices with all 6 links drawn and numbered 1–6; beside it a partial mesh of 5 devices with one link crossed out in red and a green arrow showing data taking another path.
- In a **mesh** topology, devices connect directly to several others, so there are many paths between them.
- In a **full mesh** every device connects to every other one. With 4 devices that is 6 links.
- If a link fails, data is sent along another path: the network **self-heals**.
| Advantages | Disadvantages |
|---|---|
| Very reliable: no single point of failure | A lot of cable and set-up: expensive |
| Data can take the fastest free path | Complex to set up and manage |
| Handles heavy traffic well | Many links are unused much of the time |

**4 · Calculate**
A small office links 5 computers in a full mesh: every computer has its own cable to every other one. How many cables are needed?
Answer: 10 cables (accepted: [[10.0, 10.0]])
Feedback (correct): Right. Each of the 5 computers links to 4 others: 5 × 4 = 20 cable ends, and each cable has 2 ends, so 20 ÷ 2 = 10. A star would need only 5.
Feedback (wrong): Each of the 5 computers needs a cable to each of the other 4, giving 5 × 4 = 20. But that counts every cable twice (once from each end), so the answer is 20 ÷ 2 = 10 cables.

**8 · Quick check**
A hospital's patient-monitoring network must keep working even if any one cable is cut. Which topology fits best?
- A. ✓ A mesh, because data can take another path round the break. — *Right. With many paths between devices, a mesh has no single point of failure.*
- B. A star, because a cut cable only cuts off one device. — *True for one device, but that monitor would go offline, and a switch failure stops everything.*
- C. A star, because the central switch can resend the lost data. — *If a device's only cable is cut, the switch has no other way to reach it.*
- D. A mesh, because it uses the least cable of any topology. — *A mesh uses the most cable; it is chosen for reliability, not to save cable.*

**9 · Mission check**
One box fails and a whole office goes offline. How?
- A. One PC's cable broke, which cut the link for every other PC. — *In a star, each PC has its own cable, so one broken cable only cuts off that PC.*
- B. ✓ It was the central switch that every PC in a star connects to. — *Right. All data in a star passes through the centre, so it is a single point of failure.*
- C. It was a mesh, where every device depends on the one before it. — *In a mesh, data takes another path when something fails; it has no single point of failure.*
- D. The router slowed down because too many cables were attached to it. — *Extra cables don't stop a network; the problem is a failed central device.*
Shown after answering: The office used a star topology, so every PC's only link ran to one central switch. When that switch failed, no data could move at all. A mesh avoids this by giving every device more than one path.

### Mission 3: How does your data find one computer among billions online?  [module H7]

*Guess chips:* Routers follow its address, hop by hop · It is sent to every computer, and the right one keeps it · It looks up the computer's name, like "Sam-Laptop" · I'm not sure yet

**1 · Teach — IP addresses**
> Diagram D1: A laptop with two labels: "IP address 192.168.0.12" (all boards on screen 1) and, on screen 7 only for O C, "MAC address 00:1A:2B:3C:4D:5E" on its NIC. For C, bracket the MAC: "00:1A:2B" = manufacturer code, "3C:4D:5E" = serial code.
- An **IP address** identifies a device on a network, so data can be sent to it. Every packet carries a **destination IP address**.
- An **IPv4** address is 32 bits, written as four denary numbers from 0 to 255 separated by dots, e.g. 192.168.0.12. Each number is one byte (8 bits).

**3 · Teach — Routers**
> Diagram D2: Home LAN (laptop, phone) → home router → three internet routers → a server's LAN. A packet with header "to: 203.0.113.5" moves along the hops.
- A **router** connects networks together, for example a home or school LAN to the internet.
- The internet is a vast number of networks joined by routers.
- A router reads each packet's **destination IP address** and sends it to the next router on a route towards it. Hop by hop, the packet reaches the right network.

**4 · Quick check**
A packet arrives at a router in the middle of the internet. What does the router use to decide where to send it next?
- A. The source IP address in its header — *The source address says where the packet came from, not where it is going.*
- B. The name of the computer it is for — *Routers work with IP addresses, not computer names like "Sam-Laptop".*
- C. The packet number in its header — *The packet number is for putting data back in order; it says nothing about the destination.*
- D. ✓ The packet's destination IP address — *Right. The router forwards the packet towards the network with that address.*

**6 · Teach — IPv6**
- IPv4 gives about 4.3 billion addresses (2³²): too few for every phone, laptop and smart device.
- **IPv6** was created to give far more. It is 128 bits, written as eight groups of four hexadecimal digits separated by colons, e.g. 2001:0db8:85a3:0000:0000:8a2e:0370:7334.
|  | IPv4 | IPv6 |
|---|---|---|
| Size | 32 bits | 128 bits |
| Written as | 4 denary numbers, 0–255, with dots | 8 groups of 4 hex digits, with colons |
| Number of addresses | About 4.3 billion | About 3.4 × 10³⁸ |

**7 · Teach — MAC addresses**
> Diagram D1: A laptop with two labels: "IP address 192.168.0.12" (all boards on screen 1) and, on screen 7 only for O C, "MAC address 00:1A:2B:3C:4D:5E" on its NIC. For C, bracket the MAC: "00:1A:2B" = manufacturer code, "3C:4D:5E" = serial code.
- A device needs a **NIC** (network interface card) to join a network.
- Each NIC is given a **MAC address** at manufacture: 48 bits, written as 12 hex digits in six pairs, e.g. 00:1A:2B:3C:4D:5E.
- MAC addresses identify devices **within a LAN**. A MAC address stays the same; an IP address can change.

**8 · Quick check**
A technician sees the address 3C:52:82:1F:A0:6B on a laptop. What kind of address is it?
- A. An IPv6 address, because it uses hexadecimal digits — *IPv6 does use hex, but it has eight groups of four digits; this has six pairs.*
- B. An IPv4 address, because it has groups separated by marks — *IPv4 uses four denary numbers (0–255) separated by dots, not hex pairs.*
- C. ✓ A MAC address, because it has six pairs of hex digits — *Right. Twelve hex digits in six pairs make the 48-bit MAC address of the laptop's NIC.*
- D. A web address (URL) that leads to the laptop — *A URL is text such as www.example.com; this hex-pair format is fixed in the NIC when it is made.*

**9 · Teach — Devices that build a LAN**
> Diagram D3: A LAN: four desktop PCs cabled to a switch; a WAP cabled to the switch with a laptop and phone linked by radio waves; the switch cabled to a router, then to the internet cloud. I: add a modem between router and cloud, and a dashed box round modem + router + switch + WAP labelled "home router box". Q: add a hub panel showing one packet copied to all ports, and a bridge between two LANs.
- A **switch** connects the devices on a LAN. It reads where each packet is going and sends it only to that device.
- A switch uses MAC addresses to find the right device.
- A **wireless access point (WAP)** lets wireless devices join a wired network.
- **Transmission media** carry the signals: copper or fibre-optic cable, or radio waves.

**10 · Quick check**
A café wants customers' laptops to join its wired network without plugging in any cables. What should it add?
- A. A switch, to connect each laptop to the network — *A switch connects devices by cable; it doesn't provide a wireless connection.*
- B. ✓ A wireless access point, connected to the network — *Right. A WAP lets wireless devices join a wired network.*
- C. A router, to give each laptop its own internet line — *A router connects networks together; it isn't what lets laptops join wirelessly.*
- D. A NIC, fitted to the café's network cabling — *Each laptop already has its own NIC; the café needs a device that wireless NICs can reach.*

**11 · Mission check**
How does your data find one computer among billions online?
- A. It is sent to every computer, and only the right one keeps it. — *Sending to everyone would flood the internet; routers send each packet towards one address.*
- B. It follows one fixed cable laid between the two computers. — *There's no single cable: packets cross many networks, hop by hop, through routers.*
- C. It searches for the computer's name, such as "Sam-Laptop". — *Data is delivered by IP address, not by a computer's name.*
- D. ✓ Routers read its destination IP address and pass it on. — *Right. Each router sends the packet one step closer to the network with that address.*
Shown after answering: Every device online has an IP address, and every packet carries its destination IP address. The internet is many networks joined by routers; each router reads that address and forwards the packet one hop closer, until it reaches the right network and the right device.

### Mission 4: Routers only use numbers. How does a typed web address find its site?  [module N5]

*Guess chips:* A server swaps the name for a number · Routers search every website for the name · A search engine finds the site for you · I'm not sure yet

**1 · Teach — Reading a web address**
> Diagram D1: The URL `https://www.example.org/physics/waves.html` in a large monospace line, with coloured brackets underneath. **O C I version:** three brackets: "https://" = protocol (blue), "www.example.org" = domain name (green), "/physics/waves.html" = web page / file name (orange). **Q version:** five brackets: "https" = scheme, "www" = subdomain, "example" = second level domain, ".org" = top level domain, "/physics/" = sub directory; "waves.html" left grey and unlabelled.
- The **internet** is a worldwide collection of computer networks: the infrastructure.
- A **URL** (uniform resource locator) is the text address of a web page.
- Its parts: the **protocol** (https), the **domain name** (www.example.org) and the **web page / file name** (/physics/waves.html).

**2 · Answer**
In the URL https://shop.example.com/sale/shoes.html, what is the domain name?
Accept: shop.example.com
Feedback (correct): Yes. The domain name is everything between "https://" and the next "/".
Feedback (wrong): Drop the protocol "https://" from the front and the path "/sale/shoes.html" from the end. What is left, shop.example.com, is the domain name.

**3 · Teach — From name to number**
> Diagram D2: DNS lookup as numbered arrows between four boxes: Browser, DNS server 1, DNS server 2, Web server (203.0.113.25). 1: browser → DNS server 1 "www.example.org?"; 2: DNS server 1 → DNS server 2 "don't know: ask on" (dashed); 3: DNS server 2 → DNS server 1 → browser "203.0.113.25"; 4 (faint, labelled "next") browser → web server.
- Every device on the internet is found by its **IP address**, e.g. 203.0.113.25. Names are easier to remember.
- The **DNS** (Domain Name Service, made of many Domain Name Servers) matches **domain names** to **IP addresses**.
- The browser sends the domain name to a DNS server, which returns the IP address.
- If that server doesn't hold the name, it asks another DNS server. If none does, an error is returned.

**4 · Teach — Fetching the page**
> Diagram D3: Request/response: Browser (client) on left, Web server on right. Top arrow "HTTP request: GET /physics/waves.html"; bottom arrow "response: HTML, images". A second version strip below labelled HTTPS with a padlock and the payload drawn as scrambled characters.
- A **web server** stores web pages and sends them to **clients**, such as your browser, that request them.
- The browser sends an **HTTP** request to the server's IP address. The server replies with the page's **HTML**, which the browser **renders** into the page you see.
- **HTTPS** is the secure version: data is **encrypted**, so intercepted data can't be read.

**5 · Quick check**
You type https://www.example.org into a browser for the first time. What must the browser get from a DNS server before it can request the page?
- A. The full HTML code of the home page — *The web server sends the HTML later; a DNS server only deals with names and addresses.*
- B. A list of search results that match the name — *That is a search engine, which is itself a website you have to reach first.*
- C. ✓ The IP address of the site's web server — *Right. With the IP address, the browser can send its HTTP request to the correct server.*
- D. The protocol to use, either HTTP or HTTPS — *The protocol is already in the URL you typed, so the browser does not need to ask for it.*

**8 · Teach — Hosting and the cloud**
- **Hosting**: a website's files are stored on a web server, often a hosting company's, that stays online for clients.
- **The cloud**: storage, software or processing provided remotely on servers reached over the internet.
- **Advantages**: access anywhere, no hardware to buy or maintain, easy to scale, provider does backups.
- **Disadvantages**: needs an internet connection, a third party holds your data, ongoing fees.

**9 · Mission check**
Routers only use numbers. How does a typed web address find its site?
- A. Routers compare the name with every website until one matches — *Routers forward packets by IP address; they never search for names.*
- B. A search engine looks up the name and opens the closest site — *A search engine is a website itself; reaching it needs the same lookup.*
- C. The web server's IP address is stored inside the URL you type — *The URL holds a domain name, not an IP address; something has to convert it.*
- D. ✓ A DNS server converts the domain name into an IP address — *Right. The browser then sends an HTTP(S) request to that IP address.*
Shown after answering: The browser sends the domain name to a DNS server, which returns the web server's IP address (asking other DNS servers if it doesn't know). Routers then carry the HTTP or HTTPS request to that address, and the web server sends back the page for the browser to render.

### Mission 5: How do two computers that have never met agree how to talk?  [module N3]

*Guess chips:* They follow the same agreed rules · They must be made by the same company · The router translates for them · I'm not sure yet

**1 · Teach — Protocols**
- A **protocol** is a set of rules for transferring data between devices.
- It sets things like how data is formatted, how devices are addressed and how errors are spotted.
- Both devices must follow the **same** protocol, whoever made them. Different jobs use different protocols.
- A **standard** is an agreed set of rules for an area of computing. Standards let hardware and software from different makers, and different countries, work together.

**2 · Teach — Protocols for the web and email**
- **HTTP**: a browser requests web pages from a web server, which sends them.
- **HTTPS**: HTTP with **encryption**, so intercepted data can't be read.
- **FTP**: transfers files between computers.
- **SMTP**: sends email from an app to a mail server, and between mail servers.
- **IMAP**: reads email kept on the server, so every device shows the same inbox.
- **POP**: downloads email to one device, usually deleting it from the server.

**3 · Teach — Protocols that move the data**
- **TCP** splits data into numbered packets, checks they all arrive, has missing ones resent and puts them back in order.
- **IP** gives each packet its source and destination IP addresses and routes it across networks.
- TCP and IP work together, so they are often named as one: **TCP/IP**.
- **Ethernet** is the set of rules for wired LANs; **Wi-Fi** (802.11) for wireless LANs.

**4 · Quick check**
Ama clicks Send in her email app. Which protocol carries the message to her mail server?
- A. HTTPS, because the message needs to be encrypted. — *HTTPS is for secure web pages; sending email to a mail server uses SMTP.*
- B. IP, because it gives the message its address. — *IP addresses and routes packets, but the protocol for sending email is SMTP.*
- C. ✓ SMTP, the protocol for sending email. — *Right. SMTP sends email from an app to a mail server and between mail servers.*
- D. TCP, because it splits the email into packets. — *TCP does split the data, but the email-sending protocol it carries is SMTP.*

**5 · Teach — Why use layers?**
> Diagram D1: Two stacks of blank layer boxes side by side (sender and receiver), with an arrow down the sender stack, across a cable at the bottom, and up the receiver stack. A small message block gains a coloured header strip at each step down and loses it at each step up.
- Sending data is split into **layers**. Each layer does one part of the job and each protocol belongs to one layer.
- Sent data passes **down** the layers, each adding its own information. Received data passes back **up**.
- **Benefits**: each layer is a smaller problem; one layer can change without changing the others (swap a cable for Wi-Fi and the browser still works); makers can build for one layer.

**6 · Teach — The 4-layer TCP/IP model**
> Diagram D2: 4-layer stack, top to bottom: Application, Transport, Internet, Link (A O E); Application, Transport, Network, Data link (I). Protocols beside each layer as in the table on screen 6.
- For OCR you don't need to learn the layer names; this model is a worked example of layering.
| Layer | What it does | Protocols and parts |
|---|---|---|
| Application | Where network applications, such as web browsers and email programs, work | HTTP, HTTPS, FTP, SMTP, POP, IMAP |
| Transport | Sets up communication between the two hosts, which agree settings such as packet size; splits data into packets | TCP |
| Internet | Addresses and packages data; routes the packets across the network | IP |
| Link | The network hardware, such as the NIC, and the operating system's device drivers | Ethernet, Wi-Fi |

**10 · Quick check**
Engineers invent a faster type of network cable. Why can web browsers and email apps use it without being rewritten?
- A. Browsers and email apps already contain the rules for every type of cable. — *Applications don't handle cables at all; a lower layer deals with the connection.*
- B. ✓ Layers are separate, so a change at the bottom layer leaves those above alone. — *Right. Only the lowest layer's rules change; the layers above carry on as before.*
- C. The new cable must use exactly the same rules as the old one, so nothing changes. — *A new kind of connection can have new rules; layering means only that layer needs them.*
- D. The router converts the new cable's signals into the format of the old cable. — *Routers forward packets between networks; they don't hide new cables from applications.*

**11 · Mission check**
How do two computers that have never met agree how to talk?
- A. ✓ Both follow the same protocols, with each layer doing one part. — *Right. Shared, agreed rules mean any make of device can understand any other.*
- B. They must both run the same operating system from one company. — *Devices with different operating systems talk all the time because they follow the same protocols.*
- C. A router translates each computer's own rules for the other one. — *Routers forward packets; they don't translate between private sets of rules.*
- D. The faster computer sends its own rules to the slower one first. — *There are no private rules to send: the protocols are agreed in advance by everyone.*
Shown after answering: The two computers have never met, but they follow the same protocols, such as SMTP for email and TCP and IP for moving the data. The work is split into layers, each with its own protocols, so every device that follows the rules can talk to every other.

### Recap

- A network connects devices so they can share data and resources. It brings gains (sharing, central backup and management) and costs (hardware, maintenance, security risks).
- A LAN covers a small area and is owned by one organisation; a WAN covers a wide area and links LANs. The internet is the biggest WAN.
- Client-server networks centralise files and security on servers; peer-to-peer networks share them between equal computers.
- A star links every device to a central switch: a cut cable affects one device, but if the switch fails the whole network fails.
- A mesh gives devices many paths, so it self-heals, but it needs a lot of cable and is complex to set up.
- An IP address identifies a device on a network. Routers read each packet's destination IP address and forward it hop by hop.
- IPv4 is 32 bits (four numbers, 0–255); IPv6 is 128 bits in hex, giving far more addresses.
- A MAC address is a 48-bit hex address fixed in a NIC when it is made, used to find devices within a LAN.
- A URL holds a domain name; a DNS server converts it into the web server's IP address.
- The browser requests the page with HTTP or HTTPS (encrypted) and renders the HTML that comes back.
- A protocol is a set of rules for transferring data. Both devices must follow the same one, and different jobs use different protocols.
- Layers split the job so each part can be changed or built separately.
- Standards let hardware and software from different makers work together.

---

## Network security  (OCR GCSE Computer Science (J277) · 1.4)
Page: `computer-science-gcse-ocr-network-security-mini-lesson.html`

### Mission 1: In 2020, hackers hijacked famous Twitter accounts. What did they hack?  [module C1]

*Guess chips:* A bug in Twitter's code · Each celebrity's weak password · A few Twitter staff · I'm not sure yet

**1 · Teach — People as the weak point**
> Diagram D1: "Two ways to the data": a server holding data (centre right). Route 1 (top, grey): attacker → firewall icon → encryption padlock → server, drawn as a long route with a red "blocked" cross at the firewall. Route 2 (bottom, orange): attacker → speech bubble "Hi, it's IT support…" → employee at a desk → server, with a green tick.
- **Social engineering**: manipulating people so they give up confidential information, or do something unsafe.
- Strong technical security fails if a person is persuaded to let the attacker in.
- Attackers pretend to be someone trusted and use urgency, fear or a wish to help.

**2 · Teach — Phishing**
> Diagram D2: Annotated fake email from fictional "Northbank" (sender shown as `security@northbank-alerts.co`), subject "Account locked!", greeting "Dear Customer", body with one spelling error ("verifiy") and "within 24 hours", a button "Unlock account" whose hover tooltip shows `http://northbank.login-secure.xyz`. Red callouts: (1) sender address isn't the bank's, (2) urgency/threat, (3) generic greeting, (4) spelling error, (5) link goes to a different site.
- **Phishing**: fake messages, often email or SMS, that pretend to come from a trusted organisation to get private information.
- The message usually links to a fake website that copies a real login page.
- Anything typed there (passwords, bank details) goes straight to the attacker.
- Purpose: steal login or payment details for fraud or to break into accounts.

**3 · Quick check**
A text says: "ParcelGo: your parcel is held. Pay a £1.45 redelivery fee within 24 hours at parcelgo-redeliver.info". Which detail is the strongest sign of phishing?
- A. It mentions a parcel that you may really be expecting soon — *Many people are expecting a parcel, which is why this lure works; it is not a warning sign by itself.*
- B. It was sent as a text message instead of an email — *Phishing uses SMS and email; real firms also send texts, so the channel proves nothing.*
- C. ✓ The link goes to an address that isn't the firm's own site — *Right. A link to a look-alike address is the classic phishing tell: it leads to a fake page that collects your details.*
- D. The fee it asks for is only a small amount of money — *The small fee is bait to get your card details, but genuine firms charge small fees too; the fake link is the stronger sign.*

**7 · Teach — Protecting against social engineering**
- **Training**: users learn the warning signs.
- Check the real web address (URL) behind a link before clicking it.
- Verify requests through a contact you already know, not one in the message. Never share a password.

**8 · Quick check**
Priya, who works in a firm's finance team, gets an email that seems to be from her manager: "Urgent: pay this new supplier £8,000 today. I'm in meetings, so don't call." What should she do?
- A. Reply to the email and ask her manager to confirm it is genuine — *A reply goes to whoever sent the email, so an attacker would simply say yes.*
- B. Click the payment link to check whether the website looks real — *A fake site can look identical to a real one, and clicking may give away details or install malware.*
- C. ✓ Phone her manager on the number she already has before paying — *Right. Checking through a known, separate contact defeats the pretence, whatever the email says.*
- D. Forward it to the team to ask if anyone else has received it — *Forwarding spreads the risky email further and doesn't confirm whether the request is real.*

**9 · Mission check**
In 2020, hackers hijacked famous Twitter accounts. What did they hack?
- A. Each famous account's password, guessed one at a time — *Guessing 130 strong passwords would be slow and noisy; the attackers found a far easier way in.*
- B. ✓ A few Twitter staff, tricked by phone into giving logins — *Right. The weak point was people, not code: classic social engineering.*
- C. A bug in Twitter's app that let anyone post as anyone — *No software bug was needed; the attackers used real staff logins.*
- D. Messages intercepted as they travelled across the internet — *Nothing was intercepted in transit; staff were persuaded to hand over access.*
Shown after answering: Twitter said attackers used a "phone spear-phishing attack" on a small number of employees [S1]; New York regulators found the callers posed as Twitter's IT help desk [S2]. With staff logins they reached the tools used to manage accounts. That's social engineering: the people were the weak point.

### Mission 2: The fix was out by March. Why did WannaCry still hit the NHS in May?  [module C2]

*Guess chips:* The NHS had no antivirus at all · Many computers never got the fix · It was too new for any fix to work · I'm not sure yet

**1 · Teach — Malware**
> Diagram D1: A laptop in the centre with arrows in from labelled icons: "Email attachment" (paperclip), "Download" (arrow into tray), "Infected website" (browser window), "Software weakness" (cracked shield). Malware drawn as a red bug icon travelling along each arrow.
- **Malware** (malicious software): an umbrella term for hostile or intrusive software.
- It can delete or encrypt files, steal data, record typing, or let an attacker take control.
- Ways in: email attachments, downloads, infected websites and software weaknesses.

**4 · Teach — Vulnerabilities and patches**
> Diagram D2: Timeline left to right: "Weakness found" → "Patch released" (green) → "Attack begins" (red). Below the timeline, two computers: "Patch installed" with green shield, malware bouncing off; "Not patched" with red cross, malware getting in.
- A **vulnerability** is a weakness in software that an attacker can exploit.
- The maker then releases a **patch**: an update that fixes it.
- **Unpatched or outdated software** still has the weakness. An operating system that no longer gets updates can't be fixed.

**5 · Teach — Anti-malware software**
- **Anti-malware** scans files, downloads and memory for malware.
- It compares code with a database of known malware and also flags suspicious behaviour.
- Malware it finds is quarantined (isolated) or deleted.
- It needs regular updates, or it can't recognise new malware.

**6 · Quick check**
A school's computers all run anti-malware, but they use an old operating system that no longer gets updates. New malware spreads through a weakness in that system. Which change protects them best?
- A. Run a full anti-malware scan on every computer each night — *A scan may catch known malware after it arrives, but the weakness it uses stays open.*
- B. Make all staff passwords longer and harder to guess — *This malware uses a software weakness, so it doesn't need anyone's password.*
- C. Back up every computer's files to a separate drive each evening — *Backups help recovery after an attack but don't stop the infection.*
- D. ✓ Move to a supported operating system and install its patches — *Right. Only a patch removes the vulnerability, and unsupported systems never get one.*

**7 · Teach — Attacks on networks**
- **Brute-force attack**: trying every possible password until one works. Aim: get into an account. Defence: long passwords, lock-outs.
- **Denial of service (DoS)**: flooding a server with requests so real users can't get in. Aim: disruption or blackmail.
- **Data interception and theft**: capturing data as it travels across a network, e.g. by packet sniffing. Aim: steal data. Defence: encryption.

**8 · Teach — SQL injection**
> Diagram D3: Login form: Username `bea`, Password field showing `x' OR '1'='1`. Below, the query the program builds, monospace: `SELECT * FROM users WHERE username = 'bea' AND password = 'x' OR '1'='1'` with the injected part highlighted orange. Result box: "3 rows returned: login accepted" in red.
- **SQL injection**: typing SQL code into a data entry box, such as a login form, so the database runs it.
- It works when a program builds its query by joining user input straight into the SQL.
- Aim: get past a login, or reveal, change or delete data.
- Prevention: validate input and pass it to the database as data, never as part of the SQL command.

**9 · Quick check**
A game's login server suddenly gets millions of fake requests every second, and real players can't log in. Which attack is this?
- A. A brute-force attack — *A brute-force attack keeps guessing passwords to get in; here the aim is to block everyone out.*
- B. ✓ A denial of service attack — *Right. Flooding a server with requests stops genuine users reaching it.*
- C. Data interception and theft — *That captures data in transit; it doesn't stop players reaching the server.*
- D. SQL injection — *SQL injection sends commands through an input box; it doesn't need millions of requests.*

**11 · Mission check**
The fix was out by March. Why did WannaCry still hit the NHS in May?
- A. It was so new that no update could have stopped it — *The fix already existed; alerts to install it went out in March and April.*
- B. The NHS had no anti-malware on any of its computers — *Anti-malware alone can't close a software weakness; the missing piece was the patch itself.*
- C. ✓ Many PCs never installed it, or ran Windows too old for it — *Right. A patch only protects the computers that install it.*
- D. Staff typed their passwords into a fake NHS login page — *That would be phishing; WannaCry got in through a software vulnerability, not stolen passwords.*
Shown after answering: The National Audit Office found that the infected NHS organisations had unpatched or unsupported Windows operating systems [S1]. A patch only protects computers that install it, so the malware spread to the ones that hadn't.

### Mission 3: Thieves reached a store's card tills via its air-con firm. How?  [module C3]

*Guess chips:* They cracked the card data's encryption · The firm's login reached too far · Till staff were tricked into helping · I'm not sure yet

**1 · Teach — Access levels**
> Diagram D1: Access grid. Rows: Student, Teacher, Network admin. Columns: Homework folder, Exam papers, Network settings. Cells: Student = Read / None / None; Teacher = Read+Write / Read+Write / None; Admin = Read+Write / Read+Write / Read+Write. "None" cells grey with a lock icon.
- **User access levels** set which users can read, change or delete each file, folder or system.
- Each person gets only the access their role needs: a pupil can't open exam papers.
- An administrator sets and reviews them.
- **Physical security**: locked server rooms, ID badges and CCTV stop people reaching the equipment.

**2 · Teach — Passwords and authentication**
- **Authentication** checks that a user really is who they claim to be, e.g. with a username and password.
- A strong password is long, mixes character types, isn't a dictionary word and isn't reused.
- Systems should lock an account after a few wrong attempts, which defeats guessing.

**3 · Teach — Firewalls**
> Diagram D2: Internet cloud → firewall (brick wall with a rule list: "Allow: web traffic to web server", "Block: everything else from outside") → office LAN. Two packets: green one passes, red one bounced back. A second, internal firewall separates the "Office" zone from a "Finance" zone.
- A **firewall** monitors incoming and outgoing network traffic and allows or blocks it using a set of security rules.
- Firewalls inside a network stop traffic from one part reaching a more sensitive part.

**4 · Quick check**
A school lets its catering supplier log in to its network to update the lunch menu. Which setting best protects pupils' records?
- A. Give the supplier's account a long, strong password — *A strong password stops guessing, but whoever logs in can still reach everything the account allows.*
- B. ✓ Limit the supplier's account to the menu system — *Right. Limiting access to what the role needs means a stolen supplier login can't reach pupil data.*
- C. Install anti-malware on the school's main server — *Anti-malware detects malicious software; it doesn't control what a valid login can reach.*
- D. Make the supplier change its password every week — *A new password is still a full-access password; what the account can reach hasn't changed.*

**6 · Teach — Encryption as a defence**
> Diagram D3: Sender: "Card: 4929 1234 5678 9012" → padlock "encrypt with key" → network line showing "h8$Kq!z0Lw…" → attacker eavesdropping sees only the scrambled text → receiver with key → original text.
- **Encryption** scrambles data using a key, so only someone with the right key can read it.
- Data intercepted or stolen while encrypted is useless to an attacker without the key.
- Encrypt data sent across network connections, wired or wireless (e.g. HTTPS websites, wireless networks), and stored data.

**9 · Teach — Testing your own defences**
- **Penetration testing**: authorised testers try to break into a system to find weaknesses before criminals do.

**10 · Quick check**
Why would a bank pay a security firm to try to break into its own network?
- A. ✓ To find and fix weaknesses before real attackers use them — *Right. That is penetration testing: an authorised attack to expose vulnerabilities.*
- B. To check how quickly its network handles data at busy times — *That is performance testing; penetration testing looks for security weaknesses.*
- C. To recover the data lost after an attack has already happened — *Recovery uses backups; penetration testing happens before an attack, to prevent one.*
- D. To make sure customers' passwords are long enough to be safe — *Password rules are set by the system; testers look for any way in, not just weak passwords.*

**13 · Mission check**
Thieves reached a store's card tills via its air-con firm. How?
- A. They broke the encryption on card data as it crossed the internet — *The attackers didn't need to break any encryption; they came in through a legitimate route.*
- B. Till staff were tricked into installing the thieves' software — *The route started at an outside supplier, not with staff at the tills.*
- C. ✓ The firm's login got them in, and the network didn't stop them — *Right. Weak access limits and poor separation let a supplier's foothold reach the most sensitive systems.*
- D. A bug in the air-con system itself took control of the tills — *The way in was the supplier's network access, not the air-con machinery.*
Shown after answering: The retailer had given an air-con firm remote access to its network, and attackers used that foothold [S1][S2]. A US Senate report found the retailer had not isolated its most sensitive systems from the rest of its network, so the attackers moved on to the card tills [S1][S2]. Access levels limiting the supplier to its billing system, and firewalls between parts of the network, could have blocked that route.

### Recap

- Social engineering manipulates people into giving away information or access: people are often the weakest point in a system.
- Phishing uses fake messages and fake websites to steal details; check links, verify through a known contact, never share passwords.
- Malware is hostile software; it gets in through attachments, downloads, websites and weaknesses in software.
- Patches fix vulnerabilities, but only once installed; anti-malware must be kept up to date to recognise new malware.
- Network attacks include brute force, denial of service and data interception; each has its own defence.
- Access levels give each user only what their role needs; authentication proves who a user is; firewalls allow or block traffic using rules.
- Encryption makes intercepted or stolen data unreadable without the key.
- Penetration testing finds weaknesses before attackers do.

---

## Systems software  (OCR GCSE Computer Science (J277) · 1.5)
Page: `computer-science-gcse-ocr-systems-software-mini-lesson.html`

### Mission 1: One CPU core, three apps at once. How is that possible?  [module S1]

*Guess chips:* The OS switches the core between them very fast · The core splits into three mini-processors · Each app waits until the one before it ends · I'm not sure yet

**1 · Teach — The manager between apps and hardware**
> Diagram D1: Layer stack, top to bottom: User → Application software (icons: word processor, browser, game) → Operating system → Hardware (CPU, RAM, storage, input/output devices). Two-way arrows between neighbouring layers labelled "requests" (down) and "results" (up).
- The **operating system (OS)** is system software that manages the hardware and provides a **platform** for applications to run on.
- Apps don't control the hardware themselves: they ask the OS.
- The OS loads apps into memory, starts them and closes them.

**2 · Teach — Sharing the processor and memory**
> Diagram D2: Time-slice strip: one horizontal bar labelled "CPU core", divided into equal slices coloured by process (Music blue, Download green, Essay orange) repeating M, D, E, M, D, E, M, D, E. Small "OS switches" ticks between slices. Below it, three short bars for the user's view, all continuous, captioned "What you see: all three running".
- Each running program is a **process**. One core runs one instruction at a time.
- The OS **schedules** processes: each gets a short **time slice** on the CPU, then the OS switches to the next.
- Switching is so fast that programs seem to run at once: **multitasking**.
- **Memory management**: the OS gives each program its own area of RAM, keeps programs apart, and frees the area when a program closes.

**3 · Quick check**
On a single-core laptop you play music, download a file and type an essay. What keeps all three going?
- A. ✓ The OS gives each program short turns on the CPU, switching rapidly — *Right: scheduling with time slices makes the programs appear to run at the same time.*
- B. The CPU divides itself into three smaller processors, one per program — *A single core can't split itself; running truly in parallel needs more than one core.*
- C. Each program runs to the end before the next one is allowed to start — *Then the music would have to finish before you could type, which isn't what happens.*
- D. RAM runs one of the programs while the CPU runs the other two — *RAM only stores programs and data; all processing happens in the CPU.*

**4 · Teach — Devices and files**
> Diagram D3: Path of a print request: Word processor → OS → printer driver → printer. Label on driver: "translates OS commands for this printer model".
- The OS manages **peripherals** (input, output and storage devices) and the data passing between them and the processor.
- A **device driver** lets the OS communicate with one particular device. It translates OS commands into ones that device understands.
- **File management**: the OS organises files into folders and lets you name, save, move, copy and delete them.

**5 · Teach — Interface, users and security**
- The **user interface** lets you control the computer, e.g. a **graphical user interface (GUI)** with windows, icons, menus and a pointer, or a command-line interface where you type commands.
- **User management**: the OS creates user **accounts**, checks logins and gives each account **access rights** to particular files and programs.
- **Security**: the OS asks for a password or other login, blocks unauthorised access to files and memory, and installs security updates.

**7 · Quick check**
A new printer is detected, but every page comes out as strange symbols. Which software most likely needs installing or updating?
- A. A compression utility, so the files are small enough to print — *File size doesn't make a printer print symbols; the OS can't talk to it properly.*
- B. A bigger time slice on the CPU for the printing process — *More CPU time would print the same wrong output, only sooner.*
- C. ✓ The device driver for that model of printer — *Right: the driver translates the OS's commands into ones this printer understands.*
- D. More RAM, so the OS can hold the whole document — *Lack of memory would slow or stop printing, not turn the text into symbols.*

**8 · Mission check**
One CPU core, three apps at once. How is that possible?
- A. The core is split into three parts that each run one of the apps — *A core can't split itself; that would need three cores.*
- B. The apps share RAM, so they don't need the CPU very often — *RAM only stores data; every app still needs the CPU to run its instructions.*
- C. ✓ The OS switches the core between the apps in very short turns — *Right: scheduling gives each process a time slice, fast enough to look simultaneous.*
- D. The OS runs one app right to the end, then starts the next one — *Then you couldn't type while the music played; the apps really do take turns.*
Shown after answering: They don't really run at the same moment. The operating system schedules the processes, giving each a short time slice on the core and switching between them so quickly that all three appear to run at once.

### Mission 2: Why could shuffling files around make an old hard drive faster?  [module S4]

*Guess chips:* It puts each file's pieces side by side · It deletes junk files to free up space · It squashes files so there's less to read · I'm not sure yet

**1 · Teach — Housekeeping software**
- **Utility software** is system software that helps to maintain, protect or configure a computer.
- It carries out **housekeeping** tasks that the operating system may not do, or may not do well enough, on its own.
- Some utilities come with the OS; others are installed separately.
- Examples: encryption, defragmentation and data compression software.

**2 · Teach — Fragmented files**
> Diagram D1: Two rows of 16 disk blocks. "Before": file A (blue) in blocks 1, 2, 7, 12; file B (orange) in blocks 3, 9, 10, 15; free blocks (white) 4, 5, 6, 8, 11, 13, 14, 16. "After": A in 1–4, B in 5–8, free 9–16. Above "Before", a dotted path of the read/write head jumping to each blue block.
- A magnetic hard disk stores files in **blocks**. The read/write head moves to each block to read it.
- As files are saved and deleted, free space becomes scattered gaps, so new files get split up: they are **fragmented**.
- Reading a fragmented file needs many slow head movements.
- A **disk defragmenter** moves each file's pieces next to each other (**contiguous**) and groups the free space together, so files load faster.

**3 · Quick check**
Ali's new laptop has a solid state drive (SSD). Is it worth running a defragmenter on it?
- A. Yes, because files on an SSD must be in order before they can be read — *An SSD can read blocks in any order without a speed penalty.*
- B. ✓ No, an SSD has no moving head, so block position barely affects speed — *Right: SSD access time doesn't depend on where data is, and needless extra writes cause wear.*
- C. Yes, because defragmenting frees up extra storage space on any drive — *Defragmenting only moves data; the amount of free space stays the same.*
- D. No, because an SSD compresses every file as it is saved — *Compression and fragmentation are different things; SSDs don't compress every file.*

**4 · Teach — Backup, compression and encryption**
> Diagram D2: Three small panels side by side: Backup (file copied to an external drive/cloud icon, original stays), Compression (big file icon → smaller file icon, labelled "fewer bytes"), Encryption (readable text "Meet at 3" → scrambled text with a key icon).
- **Compression** software makes files smaller, so they use less storage space and transfer faster.
- **Encryption** software scrambles data so it can't be read without the key, e.g. on a lost laptop.

**8 · Quick check**
Mia's folder of reports and spreadsheets is 45 MB, but her email allows attachments up to 20 MB. Which utility helps most?
- A. A disk defragmenter, so the files sit together on the disk — *Defragmenting changes where files are stored, not how big they are.*
- B. Encryption software, so the files are safe to send by email — *Encryption protects the data but doesn't make it smaller.*
- C. ✓ Compression software, so the files take up fewer megabytes — *Right: compression reduces file size so it can fit under the limit.*
- D. A device driver, so the email program can handle large files — *Drivers let the OS control hardware devices; they don't change file sizes.*

**9 · Mission check**
Why could shuffling files around make an old hard drive faster?
- A. It deletes unused files, so the head has less to search through — *A defragmenter moves data but doesn't delete files.*
- B. It compresses each file, so there's less data for the head to read — *Defragmenting doesn't compress anything; file sizes stay the same.*
- C. It spreads data evenly so no part of the disk wears out too soon — *Spreading writes to reduce wear is something SSDs do, and it doesn't speed up reading.*
- D. ✓ It moves each file's pieces together, so the head moves less — *Right: contiguous files can be read with far fewer slow head movements.*
Shown after answering: Over time a hard disk's files get split into fragments scattered across the platter, and the read/write head wastes time jumping between them. A defragmenter moves each file's pieces next to each other and gathers free space together, so files are read with far less head movement.

### Recap

- The OS is system software that manages the hardware and gives applications a platform to run on.
- It shares the processor between processes (multitasking) and shares out memory, and manages peripherals using device drivers.
- It also manages files, the user interface, user accounts and security.
- Utility software is system software that does housekeeping tasks to maintain, protect or configure the computer.
- A defragmenter makes files contiguous on a magnetic hard disk so they load faster; it isn't needed on an SSD.
- Compression shrinks files; encryption keeps them unreadable without the key.

---

## Ethical, legal, cultural and environmental impacts  (OCR GCSE Computer Science (J277) · 1.6)
Page: `computer-science-gcse-ocr-ethical-legal-cultural-issues-mini-lesson.html`

### Mission 1: Logging in with a friend's password just to look: is it a crime?  [module E1]

*Guess chips:* Only if you change or delete something · Yes, using it without permission is enough · No, not if they're your friend · I'm not sure yet

**1 · Teach — The Computer Misuse Act 1990**
> Diagram D1: "Offence ladder": three steps rising left to right. Step 1 "Unauthorised access" (icon: padlock opened with a key labelled "someone else's password"); step 2 "…with intent to commit a further crime" (icon: padlock + bank card); step 3 "Unauthorised acts with intent to impair" (icon: padlock + broken cog/malware bug). Height shows seriousness.
- The **Computer Misuse Act 1990** (CMA) makes hacking a crime in the UK. **Unauthorised** means without the owner's permission.
| Offence | Example |
|---|---|
| **Unauthorised access** to computer material | Logging in with someone else's password, even just to look |
| Unauthorised access **with intent to commit a further crime** | Logging in to someone's bank account to steal money |
| Unauthorised acts **with intent to impair** a computer or its data (or reckless about it) | Planting malware, deleting files, a denial of service attack |

**2 · Quick check**
Sam uses a stolen password to log in to a shop account and orders goods charged to the owner's card. Which offence fits best?
- A. Unauthorised access only, as no files were damaged — *He also meant to commit a further crime (fraud), so the more serious offence applies.*
- B. ✓ Unauthorised access with intent to commit a further crime — *Right. He got in without permission in order to commit fraud.*
- C. Unauthorised acts with intent to impair the computer — *He didn't try to damage or disrupt the system or its data; he used it as normal.*
- D. No offence, because the password he typed in was the correct one — *A correct password used without the owner's permission is still unauthorised access.*

**3 · Teach — Laws that protect personal data**
> Diagram D2: A person card (name, home address, photo, location pin, heart icon for health) with arrows into a building labelled "Organisation (data controller)". Around the building, a shield with seven short labels: Lawful & fair, Purpose, Minimum, Accurate, Not kept too long, Secure, Accountable.
- **Personal data** is any information that identifies a living person: name, address, photo, location, health records.
- In the UK, the **Data Protection Act 2018** (DPA) and the **UK GDPR** control how organisations collect, store and use it. Organisations must follow seven principles: [S6]
| Principle | In plain words |
|---|---|
| Lawfulness, fairness and transparency | Have a legal reason; tell people what you collect and why |
| Purpose limitation | Use it only for the reason you gave |
| Data minimisation | Collect only what you need |
| Accuracy | Keep it correct and up to date |
| Storage limitation | Don't keep it longer than needed |
| Integrity and confidentiality (security) | Protect it from loss, theft and hacking |
| Accountability | Be able to show you follow the rules |

**4 · Teach — Your rights over your data**
- The person the data is about is the **data subject**. The organisation deciding how it is used is the **data controller**.
| You have the right to… | Example |
|---|---|
| Be told what is held and why | A privacy notice when you sign up |
| Get a copy (**subject access request**) | Usually free, answered within one month [S7] |
| Have it corrected | Fix a wrong address |
| Have it deleted, in some cases | Close an old account |
| Object to direct marketing | Stop sales emails |
- Serious data breaches must be reported to the **Information Commissioner's Office (ICO)** within 72 hours of finding out. [S8]

**5 · Quick check**
A gym keeps the bank details and photos of members who left eight years ago, "in case they rejoin". Which principle is it breaking?
- A. Accuracy: the old details might be out of date — *Possible, but the main problem is keeping the data at all after it stopped being needed.*
- B. Purpose limitation: it uses the data for a new reason — *The gym isn't using the data for anything new; it is just holding on to it.*
- C. ✓ Storage limitation: it keeps data longer than needed — *Right. Ex-members' data should be deleted once there is no longer a reason to hold it.*
- D. Security: the data must be stored without protection — *Nothing says the data is unprotected; the issue is how long it is kept.*

**8 · Mission check**
You log in with a friend's password just to look, and change nothing. Is it a crime?
- A. No, because nothing was changed or damaged — *The basic offence is getting in without permission; damage isn't needed.*
- B. Only if your friend reports it to the police — *Reporting affects whether you are caught, not whether a crime happened.*
- C. ✓ Yes, it is unauthorised access even with no damage — *Right. Knowing you have no permission to log in is enough.*
- D. No, it is your friend's fault for not hiding the password — *Seeing a password is not permission to use it.*
Shown after answering: Yes. Using someone's login without their permission is unauthorised access, an offence under the UK's Computer Misuse Act 1990 even if you only look. Laws like this, and data protection laws, exist because computers hold information people have a right to keep private.

### Mission 2: You paid for an app. What exactly did your money buy?  [module E5]

*Guess chips:* The app itself, to copy and share as you like · Permission to use it, on the maker's terms · The app and its code, so you can change it · I'm not sure yet

**1 · Teach — Who owns software?**
> Diagram D1: A game icon split into layers: "Code", "Graphics", "Music", each with a © badge; a timeline arrow from "Created" (© appears immediately, "no registration") to "Creator's life + 70 years".
- **Intellectual property (IP)**: creations of the mind, such as code, music, inventions, brands.
- **Copyright** protects a creator's work, including code, graphics and sound. It applies **automatically** and usually lasts the creator's life plus 70 years. [S5]
- It protects the work, not the idea.
- The **Copyright, Designs and Patents Act 1988** makes copying, sharing or selling a work without permission illegal.

**2 · Teach — Software licences**
- A **software licence** is the copyright owner's legal permission to use their software, with rules attached.
- Buying software normally gets you a licence, not the copyright.
- A licence can set: how many devices or users; whether you may copy, change or pass it on; one-off or subscription.
- Why license? Creators earn money and control use; users get clear, legal permission.

**3 · Quick check**
Mia's game licence is for one console. She installs a copy on her cousin's console too. Which statement is correct?
- A. It's allowed, because she paid the full price for the game — *Paying bought a licence with conditions; it doesn't allow extra copies.*
- B. It's allowed, because family use isn't public — *There is no "family" exception; copying beyond the licence still needs the owner's permission.*
- C. ✓ It breaks the licence: she copied it without permission — *Right. The licence covers one console, so the second copy infringes copyright.*
- D. It's allowed, as long as she doesn't sell it — *Copying without permission infringes copyright even if no money changes hands.*

**4 · Teach — Open source or proprietary?**
> Diagram D2: Two boxes side by side. Open source: a program window with its code visible through a glass panel and a pencil icon. Proprietary: the same window with the code panel locked (padlock) and a price tag.
|  | **Open source** | **Proprietary** |
|---|---|---|
| Source code | Available to view | Hidden; you get only the compiled program |
| Changing it | Allowed; changes can be shared (often under the same licence) | Not allowed; no copying or modifying |
| Cost | Usually free | Usually paid, often bought off the shelf or by subscription |
| Support | Community forums and guides; quality varies | Company support, regular updates, often a warranty |
- "Free" doesn't always mean open source: some free programs are proprietary and still hide their code.

**5 · Quick check**
A small charity wants a database program it can adapt to its own needs, with no licence fee. One volunteer is a programmer. Which licence would you recommend?
- A. Proprietary, because paid software is always more secure than free — *Paid software isn't automatically more secure, and it costs money the charity wants to save.*
- B. Open source, because the charity would then own the copyright — *Open source grants permissions; the copyright stays with the original authors.*
- C. Proprietary, because the company will change the code for free — *Proprietary code is hidden, and companies normally charge for custom changes.*
- D. ✓ Open source, because they can view and change the code at no cost — *Right. The programmer can adapt it, and there's no licence fee; the drawback is relying on community support.*

**10 · Mission check**
You paid for an app. What exactly did your money buy?
- A. ✓ A licence to use the app on the creator's terms — *Right. You bought permission to use it, with rules attached.*
- B. The copyright, so you are now the legal owner of the app — *The creator keeps the copyright; it isn't sold with each copy.*
- C. The app, which you may now copy for friends — *Copying beyond the licence terms infringes copyright.*
- D. The source code, so you can fix or change it — *Most paid apps are proprietary: the code stays hidden.*
Shown after answering: You bought a licence: permission to use the app under the creator's rules. The creator keeps the copyright, which is why copying, sharing or changing the app without permission is against the law.

### Mission 3: A free app knows where you were all week. Who agreed to that?  [module E2]

*Guess chips:* No one; that tracking would be illegal · You did, when you set up the app · Your phone network, which owns the data · I'm not sure yet

**1 · Teach — Personal data and privacy**
> Diagram D1: A phone in the centre with arrows out to icons labelled: Location (pin), Contacts (address book), Photos (camera), Browsing (globe), Health (heart). The arrows run to a cloud labelled "Company servers", from which one dashed arrow goes to "Advertisers".
- **Personal data** identifies you: name, photos, location, browsing history, smartwatch health data.
- **Privacy** is your right to control who sees information about you.
- Apps collect it through permissions and by tracking what you do.
- Data is valuable for targeting adverts or selling on. "Free" apps are often paid for with your data.

**2 · Teach — Consent and misuse**
- **Consent** means agreeing to your data being collected and used. Fair consent is informed, freely given and easy to withdraw.
- Tapping "Allow" or accepting the terms is usually treated as consent, read or not.
- **Misuse**: using data in ways people didn't agree to, such as selling or leaking it.

**3 · Quick check**
A fitness app shares users' heart-rate data with a health insurer, which then raises some users' prices. The app's terms never mentioned this. What is the main issue?
- A. ✓ Misuse: data used for a purpose users never agreed to — *Right. Users consented to fitness tracking, not to sharing with an insurer.*
- B. Accuracy: heart-rate readings from cheap watches are sometimes wrong — *Readings can be wrong, but the problem here is who received the data.*
- C. Ownership: the insurer now owns the watches — *The insurer got the data, not the devices.*
- D. Inclusion: not everyone can afford a smartwatch — *That is a real issue, but not the one this scenario raises.*

**4 · Teach — Issues across new technologies**
> Diagram D2: Five tiles in a row (phone, smartwatch/implant, cloud, wireless signal symbol, car with no driver). Under each, a green "+" with the benefit and an amber "!" with the issue, same text as the table.
| Technology | Benefit | Ethical, legal or privacy issue |
|---|---|---|
| Mobile phones | Maps, contact, payments anywhere | Constant location tracking; hard to switch off |
| Wearables and implants | Monitor health; pacemakers keep people alive | Sensitive health data could be hacked, shared or sold |
| Cloud storage | Files anywhere, automatic backup | Another company holds your data, possibly under another country's laws |
| Wireless networks | Easy connection | Data sent on open, password-free networks can be intercepted; unsecured networks invite hacking |
| Autonomous vehicles | May cut crashes caused by human error | Who is responsible when one crashes: owner, maker or programmer? |
- Most technologies bring benefits and risks; exam answers should weigh both.

**5 · Quick check**
A self-driving car's software must choose between braking hard, risking its passengers, or swerving, risking a pedestrian. Which issue does this raise most directly?
- A. Privacy: the car records every journey and where its passengers go — *True of many cars, but the dilemma here is about decisions that cause harm.*
- B. Digital divide: not everyone can afford one — *A real issue, but not the one this scenario raises.*
- C. ✓ Responsibility: who answers for the choice the software made — *Right. Someone programmed that choice, so who is accountable for the harm?*
- D. Environment: the car's battery needs mining — *That is an environmental issue, not this ethical dilemma.*

**7 · Teach — Culture and inclusion**
- The **digital divide** is the gap between people with technology and the skills to use it, and those without. Causes: cost, age, poor broadband, disability.
- Those left out lose access to jobs, learning and online-only services.
- **Inclusion**: screen readers, captions and voice control help everyone.
- **Cultural** change: online shopping empties high streets; social media reshapes friendships.

**12 · Mission check**
A free app knows where you were all week. Who agreed to that?
- A. No one; tracking without asking would be illegal — *It isn't secret: the app asked for location access and you said yes.*
- B. Your phone network, which automatically owns all of your data — *The app collected the data, and it needed your permission first.*
- C. The phone's maker, when it built the phone — *Makers don't decide what each app may collect; you grant permissions app by app.*
- D. ✓ You did, by allowing location access and accepting the terms — *Right. That is treated as consent, even if you never read the terms.*
Shown after answering: You did, usually by tapping "Allow" for location and accepting terms you probably didn't read. That is usually treated as consent, but whether it was really informed consent, and what the company may do with your data, are the big ethical and privacy questions.

### Mission 4: Your old phone is in a drawer. Why does that matter to the planet?  [module E3]

*Guess chips:* It doesn't; one phone is too small to matter · Its materials were mined at a cost and sit unused · Only the battery matters; the rest is safe plastic · I'm not sure yet

**1 · Teach — The life of a device**
> Diagram D1: A circular life cycle with four stations: Manufacture (pickaxe + factory), Use (plug), Replacement (two phones with an arrow from old to new), Disposal (bin). A small leaf/CO₂ marker at each station shows it has an impact. An arrow from Replacement loops back to Manufacture.
- Every device goes through four stages, and each affects the environment.
| Stage | Environmental impact |
|---|---|
| **Manufacture** | Mining gold, copper and cobalt uses energy and water, damages land, can involve unsafe work |
| **Use** | Devices, networks and data centres need electricity |
| **Replacement cycle** | Frequent upgrades (new features, slow software, worn batteries) mean making more devices |
| **Disposal** | Old devices become **e-waste** |
- Much of the impact happens before you even switch a device on.

**2 · Teach — Energy consumption**
- Devices, routers and servers use electricity, much of it still generated from fossil fuels, releasing carbon dioxide.
- **Data centres** run nonstop and need cooling. In 2024 they used about 1.5% of the world's electricity (415 TWh), expected to more than double by 2030, partly due to AI. [S8]
- To cut it: efficient processors, sleep modes, renewable energy, cool-climate data centres, switching off instead of standby.

**3 · Calculate**
In 2022 the world produced 62 million tonnes of e-waste. Only 22.3% was documented as properly collected and recycled. How many million tonnes is that? Give your answer to 1 decimal place. [S7]
Answer: 13.8 million tonnes (accepted: [[13.8, 13.9]])
Feedback (correct): Right: 22.3% of 62 is about 13.8 million tonnes. The other 48 million tonnes or so was not documented as recycled.
Feedback (wrong): Find 22.3% of 62: 0.223 × 62 = 13.826, so about 13.8 million tonnes.

**4 · Teach — E-waste and disposal**
> Diagram D2: Bar of 62 million tonnes of e-waste (2022), split: 22.3% (green, "documented as recycled") and 77.7% (grey, "not documented"). Below: icons for landfill, shipped abroad, recycling.
- **E-waste** is thrown-away electrical and electronic equipment. It is growing faster than recycling. [S7]
- In landfill, toxic substances such as mercury and lead can leak into soil and water.
- Some is shipped to poorer countries and burned or stripped by hand, harming workers' health.
- Recycling recovers metals: 2022's e-waste held about US$91 billion worth. [S7]
- Best first: keep using, repair, reuse, then recycle.

**5 · Quick check**
A school replaces all 300 of its laptops every two years. Which change would cut its environmental impact most?
- A. Keep replacing every two years, but recycle the old ones — *Recycling helps, but every new laptop must still be made from new materials.*
- B. ✓ Keep the laptops for four years and replace worn batteries — *Right. Fewer new devices means less mining, manufacturing and e-waste.*
- C. Keep replacing every two years, but turn screen brightness down — *Saves a little electricity, but manufacturing is the bigger impact.*
- D. Buy laptops with larger storage each time — *More storage doesn't reduce manufacturing, energy or e-waste.*

**6 · Teach — Technology can also help**
- Smart meters and smart heating show energy use and cut waste.
- Video calls and remote working reduce travel.
- Sensors and satellites monitor pollution, deforestation and ice loss; computer models forecast weather and climate change.
- Online documents and e-tickets save paper, although the servers behind them still use energy.
- In an exam answer, weigh the harms against these benefits.

**9 · Mission check**
Your old phone is in a drawer. Why does that matter to the planet?
- A. It doesn't; a single phone is far too small to make a difference — *Billions of phones are replaced, so small amounts add up.*
- B. It slowly leaks toxic chemicals into your home — *Harm comes when e-waste is crushed, burned or dumped, not from a phone in a drawer.*
- C. Only its battery matters; the rest is safe plastic — *Phones also contain metals such as gold, copper and silver.*
- D. ✓ Its mined metals sit unused while new ones are mined — *Right. Reusing or recycling it saves raw materials and energy.*
Shown after answering: Making a phone takes mined metals and a lot of energy. Left in a drawer, those materials are wasted while new phones need fresh mining; reusing or recycling it recovers them, and binning it adds to toxic e-waste.

### Recap

- Getting into a computer system without permission is a crime, even with no damage; adding intent to commit another crime or to impair the system makes it more serious. (Computer Misuse Act 1990)
- Organisations must collect only the personal data they need, keep it accurate and secure, use it only for the stated purpose and delete it when no longer needed; people can see and correct their data.
- Copyright protects code, images and music automatically; the Copyright, Designs and Patents Act 1988 makes copying, sharing or selling them without permission illegal.
- When you buy software you buy a licence: permission to use it on set terms.
- Open source gives you the code to view and change, usually free; proprietary hides the code and is usually paid for, with company support.
- Personal data has value; collecting and using it fairly needs informed consent, and using it for anything else is misuse.
- New technologies bring benefits and risks: weigh both, including privacy, safety and who is responsible.
- The digital divide and cultural change mean technology affects people unequally.
- Devices harm the environment at every stage: manufacture, use (energy), the replacement cycle and disposal.
- E-waste is growing faster than recycling; keeping devices longer, repairing and recycling all help.
- Technology also helps the environment, so good answers weigh benefits against harms.

---

## Algorithms  (OCR GCSE Computer Science (J277) · 2.1)
Page: `computer-science-gcse-ocr-algorithms-mini-lesson.html`

### Mission 1: Why does the Tube map ignore real distances, yet still work?  [module G1]

*Guess chips:* It keeps only what a traveller needs · Nobody could measure the real distances · It is to scale, just squashed · I'm not sure yet

**1 · Teach — Breaking a problem down**
> Diagram D1: Decomposition tree. Top box "Plan a Tube journey". Level 2: "Find nearest station", "Choose the route", "Work out journey time". Level 3 under "Choose the route": "Pick the lines", "Find where to change".
- **Decomposition** means breaking a problem into smaller **sub-problems**, each doing one identifiable task.
- Each sub-problem can be broken down again until it is simple to solve.
- Parts can be solved and tested separately, even by different people.
- "Plan a Tube journey" splits into: find the nearest station, choose the route, work out the time.

**2 · Teach — Leaving detail out**
> Diagram D2: Side-by-side: left, a stylised geographic plot of three made-up lines (curved, uneven station gaps, a distance scale bar); right, the same three lines redrawn Beck-style (straight segments at 0°, 45° and 90°, equal gaps, interchange circles). Same station names and order on both.
- **Abstraction** is removing unnecessary detail from a problem to focus on what matters.
- Harry Beck's 1933 Tube map keeps the lines, the order of stations and where they connect [S7].
- It drops true distances and the real shape of the tunnels: travellers do not need them.
- A program does the same: it **models** the real world with only the details the task needs.

**3 · Quick check**
A program models a snooker shot to predict where the balls will stop. Which detail should abstraction remove?
- A. The speed the cue ball is hit at — *Speed decides how far the balls travel, so the model needs it.*
- B. How much the cloth slows the balls — *Friction changes where the balls stop, so it must stay in the model.*
- C. ✓ The colour of each player's shirt — *Right: shirt colour has no effect on the balls, so it is unnecessary detail.*
- D. The positions of the table's cushions — *The balls bounce off the cushions, so the model needs where they are.*

**4 · Teach — Inputs, processes and outputs**
> Diagram D3: Input → Process → Output three-box flow for the car park ticket machine. Input box: "Hours wanted", "Coins". Process box: "Work out cost", "Work out change". Output box: "Ticket", "Change".
- To analyse a problem, identify its **inputs** (data going in), **processes** (what is done to the data) and **outputs** (results).
- Car park ticket machine: inputs are the hours wanted and the coins; the process works out the cost and change; outputs are the ticket and the change.

**5 · Quick check**
A program asks for a room's length and width and the carpet price per m², then shows the total cost. Which of these is a **process**?
- A. Typing in the room's width — *This is data going into the program, so it is an input.*
- B. ✓ Multiplying the area by the price — *Right: a calculation done on the inputs is a process.*
- C. Showing the total cost on screen — *Displaying a result is an output, not a process.*
- D. Entering the price per square metre — *This is a value the user supplies, so it is an input.*

**6 · Teach — Structure diagrams**
> Diagram D4: Structure diagram for "Quiz game". Level 2: "Set up", "Play a round", "End game". Under "Set up": "Load questions", "Set score to 0". Under "Play a round": "Ask question", "Check answer", "Update score". Under "End game": "Show final score".
- A **structure diagram** shows how a problem is decomposed, from the top down.
- The top box is the whole problem. Each level below splits a box into its sub-problems.
- Lines link each box to the sub-problems it is made of.
- Boxes at the bottom are small enough to become a subroutine or a few lines of code.

**7 · Teach — Algorithms and algorithmic thinking**
- An **algorithm** is a sequence of steps that can be followed to complete a task.
- The same algorithm can be written as a flowchart, as pseudocode or as program code.
- **Algorithmic thinking** is working out the steps that solve a problem, and their order, so the solution can be reused for similar problems.
- Decomposition, abstraction and algorithms together are the core of **computational thinking**.

**8 · Quick check**
A team splits a school app into login, timetable and messages, and gives each part to a different programmer. Which idea is this?
- A. Abstraction, because detail is hidden from each programmer — *Abstraction removes unneeded detail; here nothing is removed, the problem is split up.*
- B. An algorithm, because the parts are built in order — *An algorithm is a sequence of steps for a task; splitting a project into parts is something else.*
- C. Testing, because each part can be checked on its own — *Separate testing is a benefit of this idea, not its name.*
- D. ✓ Decomposition, as the problem is split into sub-problems — *Right: each part does one identifiable task and can be built separately.*

**9 · Mission check**
Why does the Tube map ignore real distances, yet still work?
- A. Its designer could not get accurate measurements of the tunnels — *The real geography was known; Beck chose to leave it out.*
- B. It is drawn to scale, but every line is stretched by the same amount — *It is not to scale: the centre is enlarged and gaps are evened out.*
- C. ✓ It keeps the details travellers need and removes the rest — *Right: lines, station order and connections stay; distances and tunnel shapes go.*
- D. Most journeys are in central London, where distances are tiny — *The map covers the whole network, and the centre is in fact drawn bigger.*
Shown after answering: Beck's map is an abstraction. It removes detail a traveller does not need (true distances, tunnel shapes) and keeps what they do need (the lines, the order of stations and where to change), so planning a journey splits into simple sub-problems: which line, where to change, where to get off.

### Mission 2: How can you find a bug without running the program?  [module G2]

*Guess chips:* Read the error message it gives · Follow it by hand, line by line · You can't: bugs only show when it runs · I'm not sure yet

**1 · Teach — Flowchart symbols**
> Diagram D1: The six flowchart symbols in a row, each labelled: terminator (rounded rectangle / stadium), input/output (parallelogram), process (rectangle), decision (diamond, with two exits labelled Yes and No), subroutine (rectangle with a double vertical line at each side), flow line (arrow).
| Symbol | Meaning |
|---|---|
| Rounded rectangle (terminator) | Start or Stop |
| Parallelogram | Input or output |
| Rectangle | Process, such as a calculation |
| Diamond | Decision: two exits, Yes/No or True/False |
| Rectangle with double sides | Subroutine (a separate sub-program) |
| Arrow (flow line) | The direction control flows |
- A **flowchart** shows an algorithm's steps and the order they happen in.

**2 · Quick check**
> Diagram D2: Flowchart: Start → parallelogram "INPUT temp" → diamond "temp > 30?" Yes → parallelogram "OUTPUT 'Hot'" → Stop. No → diamond "temp < 10?" Yes → "OUTPUT 'Cold'" → Stop; No → "OUTPUT 'Mild'" → Stop.
This flowchart is run with the input 10. What does it output?
- A. Hot — *10 is not greater than 30, so the first decision takes the No exit.*
- B. Cold — *The test is temp < 10, and 10 is not less than 10, so this is a boundary slip.*
- C. Nothing is output — *Every path through the flowchart ends at an output, so something is always shown.*
- D. ✓ Mild — *Right: 10 > 30 is false and 10 < 10 is false, so the last output is used.*

**3 · Teach — Pseudocode and code**
- **Pseudocode** writes an algorithm as structured statements, not tied to one programming language.
- OCR exam questions use the OCR Exam Reference Language shown here
- This algorithm loops while the count is above 0. Each time round it doubles the result and counts down by 1.
```
count = 3
result = 1
while count > 0
    result = result * 2
    count = count - 1
endwhile
print(result)
```

**4 · Teach — Trace tables**
> Diagram D3: Trace table for screen 3's algorithm. Columns: count, result, Output. Rows: (3, 1, –), (2, 2, –), (1, 4, –), (0, 8, –), (–, –, 8).
- A **dry run** follows an algorithm by hand. A **trace table** records it: one column per variable, plus Output.
- Add a row when a value changes. For screen 3, count goes 3, 2, 1, 0 and result goes 1, 2, 4, 8.
- The pattern shows the **purpose**: it works out 2 to the power of the starting count.

**5 · Calculate**
```
num = 37
steps = 0
while num > 1
    num = num DIV 2
    steps = steps + 1
endwhile
print(steps)
```

Dry-run this algorithm. What does it output?
Answer: 5  (accepted: [[5.0, 5.0]])
Feedback (correct): Yes. num goes 37, 18, 9, 4, 2, 1, and steps goes up once each time: 5.
Feedback (wrong): Integer division drops the remainder: 37 → 18 → 9 → 4 → 2 → 1. That is 5 passes of the loop, then num > 1 is false, so steps is 5.

**6 · Teach — Errors in algorithms**
- A **syntax error** breaks the language's rules, e.g. a missing endif. The code will not run.
- A **logic error**: the code runs but gives a wrong result, e.g. > where ≥ was needed.
- To fix a logic error, dry-run with test data, find where the trace goes wrong, correct it and retest.

**7 · Quick check**
```
mark = int(input("Enter mark"))
if mark > 50 then
    print("Pass")
else
    print("Fail")
endif
```

This algorithm should output Pass for any mark of 50 or more. Which test mark shows that it has a logic error?
- A. 49 — *49 should fail and does fail, so this test cannot show the error.*
- B. 51 — *51 should pass and does pass; the error only shows at the boundary.*
- C. ✓ 50 — *Right: 50 should pass, but 50 > 50 is false, so it outputs Fail. The fix is ≥ 50.*
- D. 100 — *100 passes correctly; a mark far from the boundary will not reveal this bug.*

**8 · Mission check**
How can you find a bug without running the program?
- A. Wait for the error message, which always names the faulty line — *Logic errors give no message: the program runs and simply gives a wrong answer.*
- B. ✓ Dry-run it with a trace table and compare with what should happen — *Right: the first row that differs from the expected value points to the bug.*
- C. Count its lines, because programs with bugs are usually longer — *Length tells you nothing; a one-character slip like > for ≥ is a bug.*
- D. Redraw it as a flowchart, because flowcharts cannot contain errors — *A flowchart can hold exactly the same logic error as the code.*
Shown after answering: A dry run follows the algorithm by hand, recording every variable and output in a trace table. Where a value or output differs from what it should be, you have found the logic error and its line, without running anything.

### Mission 3: How can 20 checks find one name among a million?  [module G3]

*Guess chips:* Check every 50,000th name · Throw away half the list each time · It can't: that needs a million checks · I'm not sure yet

**1 · Teach — Linear search**
> Diagram D1: Array boxes [27, 8, 63, 15, 44, 3, 70] with index labels 0–6 under each box. Arrows show checks 1 to 4 moving left to right; the 15 box highlighted green as found; boxes after it greyed as never checked.
- A **linear search** checks each item in turn, from the first, until it finds the target or reaches the end.
- The list can be in any order.
- Finding 15 in [27, 8, 63, 15, 44, 3, 70] takes 4 checks.
- At worst (target last, or missing) it checks every item.
```
found = False
i = 0
while i < 7 AND found == False    // items holds 7 values: index 0 to 6
    if items[i] == target then
        found = True
    else
        i = i + 1
    endif
endwhile
if found == True then
    print(i)
else
    print("Not found")
endif
```

**2 · Calculate**
A linear search looks for 50 in [27, 8, 63, 15, 44, 3, 70]. How many items does it check?
Answer: 7  (accepted: [[7.0, 7.0]])
Feedback (correct): Yes. 50 is not in the list, so every item must be checked before the search can report "Not found".
Feedback (wrong): The list is not sorted, so the search cannot stop early. It checks 27, 8, 63, 15, 44, 3 and 70, finds no match, and stops at the end: 7 checks.

**3 · Teach — Binary search**
> Diagram D2: Binary search for 58 in [3, 8, 11, 15, 19, 24, 27, 31, 36, 40, 44, 52, 58, 63, 70], indices 0–14. Four rows, one per check: row 1 middle index 7 (31), 58 > 31, indices 0–7 greyed; row 2 range 8–14, middle index 11 (52), 58 > 52, indices 8–11 greyed; row 3 range 12–14, middle index 13 (63), 58 < 63, indices 13–14 greyed; row 4 range 12–12, middle index 12 (58), found.
- A **binary search** only works on a **sorted** list.
- Check the **middle item**. If it is the target, stop.
- If the target is bigger, discard the middle item and all before it. If smaller, discard it and all after it.
- Repeat on what is left until the target is found or nothing is left.
- Each check halves the list: a **divide and conquer** algorithm.

**4 · Teach — Binary search in code**
- `first` and `last` mark the part of the list still being searched.
- The middle position is (first + last) DIV 2, using whole-number division.
- With an even number of items this picks the lower of the two middle items.
- Some textbooks take the higher middle item. Use one rule throughout, or the rule a question gives.
- The loop ends when the target is found or first passes last.
```
first = 0
last = 14    // items holds 15 values: index 0 to 14
found = False
while first <= last AND found == False
    mid = (first + last) DIV 2
    if items[mid] == target then
        found = True
    elseif items[mid] < target then
        first = mid + 1
    else
        last = mid - 1
    endif
endwhile
```

**5 · Answer**
[3, 8, 11, 15, 19, 24, 27, 31, 36, 40, 44, 52, 58, 63, 70]

A binary search looks for 40 in this sorted list of 15 items. Which items does it check, in order? Separate them with commas.
Accept: 31,52,40 | 31 52 40 | 31, 52, 40
Feedback (correct): Yes. 31 is the middle (8th of 15). 40 is bigger, so keep 36 to 70; their middle is 52. 40 is smaller, so keep 36, 40, 44; the middle is 40. Found in 3 checks.
Feedback (wrong): Start at the middle item, the 8th of 15: 31. 40 > 31, so discard 31 and everything before it, leaving 7 items (36 to 70) with middle 52. 40 < 52, leaving 36, 40, 44, with middle 40. Checks: 31, 52, 40.

**6 · Teach — Comparing the two searches**
> Diagram D3: Bar chart: worst-case checks for list sizes 15, 63 and 1,000: linear 15, 63, 1,000; binary 4, 6, 10.
|  | Linear search | Binary search |
|---|---|---|
| Data must be sorted? | No | Yes |
| Most checks for 15 items | 15 | 4 |
| Most checks for 1,000 items | 1,000 | 10 |
| Code | Simpler | More complex |
- Binary search is far more **time-efficient** on large sorted lists.
- Linear search suits small or unsorted lists. Sorting a list first takes time too.

**7 · Quick check**
A shop's till stores the 30 items in a basket in the order they were scanned. Which search should check whether a pen was scanned?
- A. Binary search, because it is always faster than linear search — *Binary search needs sorted data; this list is in scan order.*
- B. ✓ Linear search, because the items are not in sorted order — *Right: with unsorted data only a linear search is guaranteed to work.*
- C. Binary search, because 30 items split into two equal halves — *An even length does not help; the problem is that the list is not sorted.*
- D. Linear search, because binary search only works on numbers — *Binary search works on any sorted data, such as names in alphabetical order.*

**8 · Calculate**
A sorted list has 127 items. What is the greatest number of items a binary search will check?
Answer: 7  (accepted: [[7.0, 7.0]])
Feedback (correct): Yes. Each check halves what is left: 127 → 63 → 31 → 15 → 7 → 3 → 1, so at most 7 checks.
Feedback (wrong): Each check removes the middle item and half of the rest: 127 → 63 → 31 → 15 → 7 → 3 → 1. The last item is checked on the 7th look. A linear search could need all 127.

**9 · Mission check**
How can 20 checks find one name among a million?
- A. ✓ On a sorted list, each check of the middle throws away half — *Right: 20 halvings take a million names down to one, because 2^20 is more than 1,000,000.*
- B. Each check jumps 50,000 names ahead, then searches nearby — *That needs up to 20 jumps and then up to 50,000 more checks.*
- C. A linear search skips any names that look wrong at a glance — *A linear search checks every item in turn; it cannot skip any.*
- D. The computer checks all of the million names at the same time — *The search makes one check at a time; the trick is which item it checks.*
Shown after answering: A binary search on the sorted names checks the middle one and discards half of the list each time. Twenty halvings are enough, because 2^20 = 1,048,576 is more than 1,000,000. A linear search might need all 1,000,000 checks.

### Mission 4: Why is it called a bubble sort?  [module G4a]

*Guess chips:* Big values rise to the end, like bubbles · It splits the list into little bubbles · Sorted items pop out one at a time · I'm not sure yet

**1 · Teach — One pass**
> Diagram D1: Pass 1 on [5, 2, 8, 1, 4], drawn as four stacked rows, one per comparison: (5, 2) swap → [2, 5, 8, 1, 4]; (5, 8) no swap; (8, 1) swap → [2, 5, 1, 8, 4]; (8, 4) swap → [2, 5, 1, 4, 8].
- A **bubble sort** compares each **adjacent pair** of items, starting at the front of the list.
- If the pair is in the wrong order, **swap** them. Then move along one place and compare the next pair.
- One trip through every pair is a **pass**.
- After pass 1 of [5, 2, 8, 1, 4], the list is [2, 5, 1, 4, 8].

**2 · Answer**
Do one pass of a bubble sort (into ascending order) on [6, 3, 9, 1, 7, 4]. What is the list after pass 1? Separate the numbers with commas.
Accept: 3,6,1,7,4,9 | 3 6 1 7 4 9 | 3, 6, 1, 7, 4, 9 | [3,6,1,7,4,9]
Feedback (correct): Yes. 6 and 3 swap; 6 and 9 stay; then 9 swaps with 1, 7 and 4 in turn. Four swaps, and 9 has reached the end.
Feedback (wrong): Work pair by pair: (6, 3) swap → [3, 6, 9, 1, 7, 4]; (6, 9) no swap; (9, 1) swap; (9, 7) swap; (9, 4) swap → [3, 6, 1, 7, 4, 9]. Each comparison uses the list as it is after the last swap.

**3 · Teach — Passes until sorted**
> Diagram D2: The list after each pass for [5, 2, 8, 1, 4]: start [5, 2, 8, 1, 4]; pass 1 [2, 5, 1, 4, 8]; pass 2 [2, 1, 4, 5, 8]; pass 3 [1, 2, 4, 5, 8]; pass 4 [1, 2, 4, 5, 8] with "0 swaps: stop".
- Keep making passes. Each pass carries the largest unsorted item to its final place.
- Stop after a pass that makes **no swaps**: the list must be sorted.
- [5, 2, 8, 1, 4] needs 3 passes with swaps, then a 4th pass with none to confirm it.
- A list of n items needs at most n − 1 passes that make swaps.

**4 · Calculate**
A bubble sort stops after a pass with no swaps. How many passes does it make on [6, 3, 9, 1, 7, 4], including that last pass?
Answer: 4  (accepted: [[4.0, 4.0]])
Feedback (correct): Yes. Three passes make swaps, and the fourth pass makes none, so the sort stops.
Feedback (wrong): Pass 1 gives [3, 6, 1, 7, 4, 9]. Pass 2 gives [3, 1, 6, 4, 7, 9]. Pass 3 gives [1, 3, 4, 6, 7, 9]. Pass 4 makes no swaps, so the algorithm stops: 4 passes.

**5 · Teach — Bubble sort in code**
- The inner loop is one pass: it compares item i with item i + 1 and swaps them if needed.
- the array items holds 6 values at indexes 0 to 5, so i runs from 0 to 4.
- A swap needs a temporary variable, temp, to hold one value.
- swapped records whether the pass changed anything. The outer loop repeats until a pass makes no swaps.
```
do
    swapped = False
    for i = 0 to 4
        if items[i] > items[i + 1] then
            temp = items[i]
            items[i] = items[i + 1]
            items[i + 1] = temp
            swapped = True
        endif
    next i
until swapped == False
```

**6 · Quick check**
```
items[i] = items[i + 1]
items[i + 1] = items[i]
```

A student swaps two items without a temporary variable. Before these two lines run, the first item holds 9 and the second holds 2. What do they hold afterwards?
- A. ✓ 2 and 2 — *Right: line 1 overwrites the 9 with 2, so line 2 copies that 2 back. The 9 is lost.*
- B. 2 and 9 — *That is what a correct swap gives, but the 9 was overwritten before it could be copied.*
- C. 9 and 9 — *Line 1 copies the second item into the first, so the first becomes 2, not 9.*
- D. 9 and 2 — *The lines do change the values; assignment copies a value and replaces the old one.*

**7 · Teach — Strengths and weaknesses**
- Simple to understand and to code.
- Sorts **in place**: it needs almost no extra memory.
- Quick on a nearly sorted list: a sorted list needs just one pass.
- Slow on large lists: with 1,000 items, each pass makes 999 comparisons, and it may need 999 passes with swaps.

**8 · Calculate**
The code on screen 5 compares 5 pairs in every pass. How many comparisons does it make in total to sort [6, 3, 9, 1, 7, 4]?
Answer: 20  (accepted: [[20.0, 20.0]])
Feedback (correct): Yes. 4 passes (including the final pass with no swaps) × 5 comparisons each = 20.
Feedback (wrong): Count passes first: 3 passes make swaps and a 4th confirms the list is sorted. Each pass compares all 5 adjacent pairs, so 4 × 5 = 20 comparisons.

**9 · Mission check**
Why is it called a bubble sort?
- A. It first splits the list into small groups, or bubbles — *Bubble sort never splits the list; it only compares and swaps neighbouring items.*
- B. Sorted items pop out of the list one at a time — *No item leaves the list: items only swap places within it.*
- C. Items swap at random until they settle into order — *Every swap follows a rule: an adjacent pair in the wrong order is swapped.*
- D. ✓ Big items rise to the end, pass by pass, like bubbles — *Right: each pass carries the largest unsorted item along to its place.*
Shown after answering: In each pass, swaps carry the largest unsorted item along the list until it reaches its place at the end, like a bubble rising to the top of a drink. Each pass bubbles one more item into place, and a pass with no swaps shows the list is sorted.

### Mission 5: Why does a fast sort start by chopping a list into pieces?  [module G4b]

*Guess chips:* Tiny lists are sorted, and joining them is quick · Each piece goes to a different processor · Chopping removes the duplicates first · I'm not sure yet

**1 · Teach — Split until single items**
> Diagram D1: Split-and-merge tree for [6, 2, 9, 4, 7, 1, 8, 3]. Top half (splitting): [6, 2, 9, 4, 7, 1, 8, 3] → [6, 2, 9, 4] [7, 1, 8, 3] → [6, 2] [9, 4] [7, 1] [8, 3] → [6] [2] [9] [4] [7] [1] [8] [3]. Bottom half (merging): [2, 6] [4, 9] [1, 7] [3, 8] → [2, 4, 6, 9] [1, 3, 7, 8] → [1, 2, 3, 4, 6, 7, 8, 9].
- A **merge sort** first **splits** the list into two halves, then splits each half, and so on.
- Splitting stops when every list holds **one item**. A list of one item is already sorted.
- 8 items take 3 rounds of splitting: 8 → 4 + 4 → four lists of 2 → eight lists of 1.
- Breaking a problem into smaller problems like this is **divide and conquer**.

**2 · Teach — Merge sorted lists**
> Diagram D2: Step-by-step merge of [2, 4, 6, 9] and [1, 3, 7, 8]: 7 rows, each showing the two pointers on the front items, the comparison (1 < 2, 2 < 3, 3 < 4, 4 < 7, 6 < 7, 7 < 9, 8 < 9) and the growing output list; final row copies 9 with "no comparison".
- Now **merge** pairs of sorted lists into bigger sorted lists, until one list is left.
- To merge, compare the **first** items of both lists and move the smaller to the new list. Repeat.
- When one list is empty, copy the rest of the other across with no more comparisons.
- Merging [2, 4, 6, 9] with [1, 3, 7, 8] takes 7 comparisons (see diagram).

**3 · Answer**
Merge the sorted lists [3, 8, 9] and [1, 4, 10]. What is the merged list? Separate the numbers with commas.
Accept: 1,3,4,8,9,10 | 1 3 4 8 9 10 | 1, 3, 4, 8, 9, 10 | [1,3,4,8,9,10]
Feedback (correct): Yes. Compare fronts each time: 1, then 3, 4, 8, 9 are taken in turn, and 10 is copied across at the end.
Feedback (wrong): Compare the front items: 3 v 1 → take 1; 3 v 4 → take 3; 8 v 4 → take 4; 8 v 10 → take 8; 9 v 10 → take 9; the first list is empty, so copy 10. Result: 1, 3, 4, 8, 9, 10.

**4 · Teach — Insertion sort**
> Diagram D3: Insertion sort on [5, 2, 4, 6, 1, 3]: rows for passes 1–5: insert 2 → [2, 5, 4, 6, 1, 3]; insert 4 → [2, 4, 5, 6, 1, 3]; insert 6 → [2, 4, 5, 6, 1, 3]; insert 1 → [1, 2, 4, 5, 6, 3]; insert 3 → [1, 2, 3, 4, 5, 6].
- An **insertion sort** builds a sorted part at the start of the list, one item at a time.
- Take the next item. Shift each larger item in the sorted part one place right, then **insert** the item in the gap.
- n items need n − 1 passes: the first item starts as the sorted part.
- The diagram shows each pass on a list of 6 items.
```
for i = 1 to 5    // items holds 6 values: index 0 to 5
    current = items[i]
    pos = i
    while pos > 0 AND items[pos - 1] > current
        items[pos] = items[pos - 1]
        pos = pos - 1
    endwhile
    items[pos] = current
next i
```

**5 · Answer**
An insertion sort is run on [7, 3, 5, 1, 6]. What is the list just after the 1 has been inserted? Separate the numbers with commas.
Accept: 1,3,5,7,6 | 1 3 5 7 6 | 1, 3, 5, 7, 6 | [1,3,5,7,6]
Feedback (correct): Yes. The sorted part was [3, 5, 7]; 7, 5 and 3 each move right and 1 goes in front. The 6 has not been inserted yet.
Feedback (wrong): Pass 1 inserts 3: [3, 7, 5, 1, 6]. Pass 2 inserts 5: [3, 5, 7, 1, 6]. Pass 3 inserts 1 before all three: [1, 3, 5, 7, 6]. The 6 waits for pass 4.

**6 · Teach — Comparing sorts**
|  | Bubble sort | Merge sort |
|---|---|---|
| Large lists | Slow: hundreds of thousands of comparisons for 1,000 items | Fast: under 9,000 comparisons for 1,000 items |
| Memory | Sorts in place, little extra memory | Needs extra memory for the split lists |
| Code | Simple | More complex |
| Nearly sorted list | Quick if only a few items are out of place | Still splits and merges everything |
- Insertion sort is simple, sorts in place and is quick on nearly sorted lists, but slow on large unsorted ones.

**7 · Quick check**
A phone with plenty of free memory must sort 2 million photos into date order. Which sort suits it best?
- A. Bubble sort, because it uses less memory than merge sort — *True, but memory is not a problem here, and bubble sort is very slow on 2 million items.*
- B. Bubble sort, because one pass might be enough to sort them — *One pass is enough only if the list is already sorted.*
- C. ✓ Merge sort, as it needs far fewer comparisons on big lists — *Right: with memory to spare, merge sort's speed on large lists wins.*
- D. Merge sort, because it never needs to compare two items — *Merging compares the front items of two lists; it just needs far fewer comparisons.*

**8 · Calculate**
How many comparisons does it take to merge [4, 5, 6] with [7, 8, 9]?
Answer: 3  (accepted: [[3.0, 3.0]])
Feedback (correct): Yes. 4, 5 and 6 are each compared with 7 and taken. The first list is then empty, so 7, 8 and 9 are copied without comparing.
Feedback (wrong): Compare 4 v 7, 5 v 7, 6 v 7: three comparisons, taking 4, 5, 6. With one list empty, the rest is copied across with no more comparisons.

**9 · Mission check**
Why does a fast sort start by chopping a list into pieces?
- A. So each piece can be sorted at the same time by a different processor — *Merge sort is fast even on one processor; its speed comes from merging.*
- B. ✓ Single items are already sorted, and merging sorted lists is quick — *Right: each comparison during a merge places one item for good.*
- C. Chopping the list up finds and removes any duplicate items early — *Merge sort keeps duplicates; equal items are merged like any others.*
- D. Short pieces take less memory, so the sort uses less memory overall — *Merge sort uses more memory than bubble sort, not less.*
Shown after answering: Merge sort splits a list until every piece holds one item, and a single item is already sorted. Merging two sorted lists takes at most one comparison per item placed, so 1,000 items need under 9,000 comparisons, where a bubble sort can need hundreds of thousands.

### Recap

- **Decomposition** breaks a problem into sub-problems that can be solved separately.
- **Abstraction** removes unnecessary detail so a model keeps only what the task needs.
- An **algorithm** is a sequence of steps; start by identifying the inputs, processes and outputs.
- Flowcharts, pseudocode and program code are three ways to write the same algorithm.
- A **trace table** records each variable during a dry run; it reveals the output, the purpose and any logic error.
- Syntax errors stop code running; logic errors give wrong results.
- **Linear search** checks items one by one; it works on unsorted data but can need a check for every item.
- **Binary search** needs sorted data; it checks the middle and halves the list each time, so it needs far fewer checks.
- A bubble sort compares **adjacent pairs** and swaps any in the wrong order; one run through the list is a **pass**.
- After each pass, the largest unsorted item is in place; stop when a pass makes **no swaps**.
- It is simple and needs little memory, but it is slow for large lists.
- **Merge sort** splits the list down to single items, then merges sorted lists back together: divide and conquer.
- Merge sort is much faster on large lists but needs extra memory; bubble sort is simpler and sorts in place.
- **Insertion sort** inserts each item into a growing sorted part at the start of the list.

---

## Programming fundamentals  (OCR GCSE Computer Science (J277) · 2.2)
Page: `computer-science-gcse-ocr-programming-fundamentals-mini-lesson.html`

### Mission 1: How does a game turn 135 seconds into 2:15 on its timer?  [module P1]

*Guess chips:* Divide by 60 to get 2.25, so 2:25 · Use whole-number division and the remainder · Round 135 ÷ 60 to the nearest minute · I'm not sure yet

**1 · Teach — Variables, constants, input and output**
> Diagram D1: Two labelled memory boxes. Box "lives" (variable, blue) shows value 3 crossed out and 2 written beside it with an arrow labelled "assignment". Box "MAX_LIVES" (constant, grey, small padlock icon) holds 3. Caption: "variable: value can change · constant: value fixed while running".
- A **variable** is a named memory location whose value can change while the program runs.
- A **constant** is a named value that cannot change while the program runs. Naming it means one place to update it, and clearer code.
- **Assignment** puts a value into a variable; the first assignment is **initialisation**. Use **meaningful identifiers** like `lives`, not `x`.
```
const maxLives = 3
lives = maxLives
name = input("Enter your name")
print("Good luck, " + name)
lives = lives - 1
print(lives)
```

**2 · Teach — Data types**
- A **data type** tells the computer what kind of data a variable holds and which operations make sense.
| Data type | Holds | Examples |
|---|---|---|
| **Integer** | a whole number | 42, -7, 0 |
| **Real** | a number that can have a fractional part | 3.5, -0.25, 12.0 |
| **Boolean** | one of two values | True, False |
| **Character** | one single character | 'A', '7', '@' |
| **String** | a sequence of characters | 'Hello', '07700 900123' |

**3 · Quick check**
A program stores a customer's phone number, such as 07700 900123. Which data type is most suitable?
- A. Integer, because a phone number is made only of digits — *Storing it as an integer drops the leading 0 and loses the space, and you never do arithmetic on a phone number.*
- B. Real, because the number is too long to be a whole number — *Real is for values with a fractional part; a phone number has none and is never calculated with.*
- C. ✓ String, because it keeps the leading 0 exactly — *Right: a string keeps every character exactly as typed, including the 0 and the space.*
- D. Character, because each digit is typed as a separate character — *A character holds only one symbol; a whole phone number needs a string of characters.*

**4 · Teach — Arithmetic operators**
> Diagram D2: A bar of 200 seconds split into three blocks of 60 (green, each labelled "60") and one block of 20 (orange, labelled "remainder 20"). Under the green blocks: "integer division = 3"; under the orange: "remainder = 20". Operator labels per board: A O Q I "DIV" / "MOD"; E "//" / "%"; C "DIV(200, 60)" / "MOD(200, 60)".
- `+`, `-` and `*` work as in maths. **Real division** `/` can give a fractional answer.
- **Integer division** gives only the whole-number part. The **remainder** (modulus) is what is left over.
| Operation | 200 seconds ÷ 60 | Result |
|---|---|---|
| Real division | 200 / 60 | 3.333… |
| Integer division | 200 DIV 60 | 3 |
| Remainder | 200 MOD 60 | 20 |
- OCR calls DIV the **quotient** and MOD **modulo**.
```
total = 200
minutes = total DIV 60    // 3
seconds = total MOD 60    // 20
```

**5 · Calculate**
```
boxes = 47 DIV 6
spare = 47 MOD 6
```

A shop packs eggs in boxes of 6. It has 47 eggs. What value does the program store in `spare`?
Answer: 5  (accepted: [[5.0, 5.0]])
Feedback (correct): Yes. 6 goes into 47 seven whole times (42 eggs), leaving 5 spare.
Feedback (wrong): The remainder is what is left after whole boxes: 47 integer-divided by 6 is 7 boxes, 7 × 6 = 42, and 47 − 42 = 5. (7 is the integer division answer, and 7.83 is real division.)

**6 · Calculate**
```
result = 2 ^ 5
```

What value is stored in `result`?
Answer: 32  (accepted: [[32.0, 32.0]])
Feedback (correct): Right. The **exponent** operator raises to a power: 2 × 2 × 2 × 2 × 2 = 32.
Feedback (wrong): `^` means "to the power of", not multiply. 2 to the power 5 is 2 × 2 × 2 × 2 × 2 = 32 (2 × 5 = 10 is the common slip).

**7 · Teach — Casting**
> Diagram D3: Conveyor: a string card '15' (quotes visible, orange) goes into a box labelled with the cast function and comes out as an integer card 15 (no quotes, blue); then "+ 1 → 16". Box label per board: A "STRING_TO_INT"; O E "int()"; Q "val()"; I "RECEIVE … FROM (INTEGER)".
- **Casting** converts a value from one data type to another, e.g. the string '15' to the integer 15.
- Keyboard input usually arrives as a **string**, so cast it before doing arithmetic.
- Cast numbers to strings to join them into a message.
- OCR: `int()`, `float()` or `real()`, `str()`, `bool()`. The change is temporary: the original variable keeps its type.
```
age = int(input("Enter your age"))
print(age + 1)
print("Next year: " + str(age + 1))
```

**8 · Quick check**
A user types 15 for their age. The program reads it as a string and needs to output the age next year. What must happen first?
- A. Cast the 1 to a string so that both values match — *Joining '15' and '1' gives '151', not 16: the input must become a number instead.*
- B. Store the age in a constant so that it cannot change — *A constant is fixed when the program is written; it cannot hold a value typed in at run time.*
- C. Add 1 straight away, as '15' already looks like a number — *'15' is text, so adding 1 to it gives an error (or joins characters); it must be cast first.*
- D. ✓ Cast the input to an integer, then add 1 to it — *Right: once '15' becomes the integer 15, adding 1 gives 16.*

**9 · Mission check**
How does a game turn 135 seconds into 2:15 on its timer?
- A. It divides 135 by 60 to get 2.25, then shows that as 2:25 — *0.25 of a minute is 15 seconds, not 25: real division gives a decimal, not seconds.*
- B. It rounds 135 ÷ 60 to the nearest whole number for each part — *Rounding 2.25 gives 2 minutes but throws away the 15 seconds completely.*
- C. ✓ Integer division by 60 gives 2; the remainder gives 15 — *Right: integer division counts whole minutes and the remainder is the seconds left over.*
- D. It stores 135 as a real so the decimal part becomes the seconds — *The decimal part of 2.25 is a fraction of a minute, so it would show 25 rather than 15.*
Shown after answering: The timer keeps the time as one integer number of seconds. Integer division by 60 (DIV) gives the whole minutes, 2, and the remainder (MOD) gives the seconds left over, 15. Real division would give 2.25, which is not 2 minutes 25 seconds.

### Mission 2: How can a few lines of code print all 100 times-table answers?  [module P2]

*Guess chips:* The code secretly has 100 output lines · One loop runs inside another loop · The computer copies the first line 100 times · I'm not sure yet

**1 · Teach — Sequence and selection**
> Diagram D1: Flowchart of the grade code: Start → process "mark = 72" → decision diamond "mark ≥ 70?" (Yes → output "Distinction"; No → decision "mark ≥ 40?" → Yes "Pass" / No "Fail") → all three join → Stop. Highlight the path taken for 72 in orange.
- **Sequence**: statements run one after another, in order.
- **Selection**: a **condition** that is true or false decides which block of code runs.
- Compare with `<`, `>`, `<=`, `>=`, equal to `==` and not equal to `!=`.
- Join conditions with **AND**, **OR**, **NOT**.
```
mark = 72
if mark >= 70 then
    print("Distinction")
elseif mark >= 40 then
    print("Pass")
else
    print("Fail")
endif
```

**2 · Quick check**
```
temp = 18
wind = 35
if temp > 15 AND NOT (wind > 30) then
    print("Picnic")
else
    print("Stay in")
endif
```

What is output when this code runs?
- A. Picnic — *temp > 15 is true, but wind > 30 is also true, so NOT makes that part false and the AND fails.*
- B. ✓ Stay in — *Right: true AND NOT(true) is true AND false, which is false, so the ELSE block runs.*
- C. Picnic, then Stay in — *Selection runs only one branch: either the THEN block or the ELSE block, never both.*
- D. Nothing is output — *There is an ELSE block, so one of the two outputs always runs.*

**3 · Teach — CASE statements**
- A **switch (CASE SELECT)** statement picks one branch by comparing one variable with a list of values.
- Cases are checked in order; the first match runs, then the statement ends.
- `default` runs if no case matches.
- It is neater than a long chain of IFs when you test one variable for exact values.
```
day = input("Enter a day")
switch day:
    case "Sat":
        print("Weekend")
    case "Sun":
        print("Weekend")
    default:
        print("Weekday")
endswitch
```

**4 · Teach — Count-controlled loops**
- **Iteration** repeats a block of code.
- A **count-controlled** loop repeats a fixed number of times. A counter variable goes up by 1 each time unless a step is given.
```
for count = 1 to 5
    print(count * 3)
next count
```
All output 3, 6, 9, 12, 15.

**5 · Teach — Condition-controlled loops**
- A **condition-controlled** loop repeats until a condition changes, so you need not know the number of passes.
- A WHILE loop tests the condition **at the start**: it may run zero times.
- `do … until` tests **at the end**, so it always runs at least once.
```
total = 1
while total < 50
    total = total * 2
endwhile
print(total)
```
All output 64.

**6 · Answer**
```
n = 3
while n < 40
    n = n * 2
endwhile
print(n)
```

What is output when this code runs?
Accept: 48
Feedback (correct): Yes. n goes 3, 6, 12, 24, 48. At 48 the condition n < 40 is false, so the loop stops and 48 is output.
Feedback (wrong): Trace it: 3 → 6 → 12 → 24 (still under 40, so loop again) → 48. Now n < 40 is false and the loop ends. The output happens after the loop, so only 48 is shown (not 24, and not every value).

**7 · Teach — Nesting**
> Diagram D2: Trace table of the 3 × 3 nested loop with columns row, col, output; 9 rows: (1,1,1) (1,2,2) (1,3,3) (2,1,2) (2,2,4) (2,3,6) (3,1,3) (3,2,6) (3,3,9). Bracket in blue beside each group of three rows labelled "inner loop: 3 passes"; outer brace in orange "outer loop: 3 passes".
- **Nesting** puts one construct inside another: an IF inside a loop, a loop inside an IF, or a loop inside a loop.
- With nested loops, the **inner loop runs in full for every pass** of the outer loop.
- Total passes of the inner block = outer passes × inner passes.
```
for row = 1 to 3
    for col = 1 to 3
        print(row * col)
    next col
next row
```
Output: 1, 2, 3, 2, 4, 6, 3, 6, 9 (9 values).

**8 · Calculate**
```
for i = 1 to 4
    for j = 1 to 6
        print(i + j)
    next j
next i
```

How many values does this code output?
Answer: 24  (accepted: [[24.0, 24.0]])
Feedback (correct): Right. The inner loop runs 6 times for each of the 4 outer passes: 4 × 6 = 24.
Feedback (wrong): The inner loop restarts and runs fully on every outer pass, so multiply, don't add: 4 outer passes × 6 inner passes = 24 (not 4 + 6 = 10).

**10 · Mission check**
How can a few lines of code print all 100 times-table answers?
- A. The code has 100 output statements hidden in a library — *Writing out 100 output statements is exactly what iteration avoids.*
- B. A single count-controlled loop runs from 1 to 10 — *One loop of 10 passes gives only 10 answers, such as a single row.*
- C. ✓ A loop for 10 columns sits inside a loop for 10 rows — *Right: the inner loop runs 10 times for each of 10 outer passes, so 10 × 10 = 100.*
- D. The computer repeats the first line until it runs out of memory — *A loop needs a count or condition to stop; it doesn't run until memory runs out.*
Shown after answering: The program uses nested count-controlled loops. The outer loop counts the rows 1 to 10, and for every row the inner loop counts the columns 1 to 10 and outputs row × column. That gives 10 × 10 = 100 answers from a handful of lines.

### Mission 3: How can one name hold all 9 squares of a noughts and crosses board?  [module P3]

*Guess chips:* It can't: you need 9 separate variables · A grid-shaped array with rows and columns · One variable that changes every turn · I'm not sure yet

**1 · Teach — Arrays**
> Diagram D1: A row of 5 boxes holding 12, 7, 9, 15, 4, with the array name "scores" above and index labels below each box. Box holding 7 highlighted blue with arrow "OUTPUT scores[1]" (C: "Scores[2]"). Box holding 15 shown with 15 struck out and 20 written in, orange.
- An **array** is a **data structure**: it stores many values under one identifier. Each value is an **element**.
- All elements have the **same data type**, and the array has a **fixed length** (static).
- An **index** picks out one element. The first element has index **0**.
```
array scores = [12, 7, 9, 15, 4]
print(scores[1])      // 7
scores[3] = 20        // 15 becomes 20
```

**2 · Teach — Looping through an array**
- Use a **variable as the index** in a count-controlled loop to visit every element in turn.
- The counter runs from 0 to length − 1.
```
array temps = [18, 21, 17, 22, 19]
total = 0
for i = 0 to 4
    total = total + temps[i]
next i
print(total)
```
All output 97.

**3 · Answer**
```
array nums[5]
for i = 0 to 4
    nums[i] = i * 3
next i
print(nums[2] + nums[4])
```

What is output when this code runs?
Accept: 18
Feedback (correct): Yes. Element 2 holds 6 and element 4 holds 12, so the output is 18.
Feedback (wrong): The loop fills nums with 0, 3, 6, 9, 12 at indexes 0 to 4. So nums[2] is 6 and nums[4] is 12: 6 + 12 = 18. If you got 12, you counted from index 1 instead of 0.

**4 · Teach — 2D arrays**
> Diagram D2: A 3 × 3 noughts and crosses grid; X in the centre, O bottom-left, others empty. Row labels down the left, column labels along the top, and a callout on the centre: A E "board[1][1]"; O Q I "board[1,1]"; C "Board[2,2]".
- A **two-dimensional (2D) array** is like a table: one identifier, with **rows** and **columns**.
- Each element needs **two indexes**: `board[row, col]` (row first here).
- A noughts and crosses board is a 3 × 3 2D array of characters.
- A 2D array can emulate a database table: each row is a record and each column a field.
```
array board[3,3]
board[1,1] = "X"     // centre square
board[2,0] = "O"     // bottom-left square
```

**5 · Quick check**
| 5 | 8 | 2 | 9 |
| 7 | 1 | 6 | 3 |
| 4 | 10 | 11 | 0 |

This table shows a 2D array `marks` with 3 rows and 4 columns (row first). What is `marks[1, 2]`?
- A. 8 — *That is the first row, second column: you counted from 1. Indexes start at 0, so row 1 is the second row.*
- B. 1 — *Row 1 is right, but column 2 is the third column (0, 1, 2), not the second.*
- C. ✓ 6 — *Right: row 1 is the second row and column 2 is its third value, 6.*
- D. 10 — *That is row 2, column 1: you swapped the row and column indexes.*

**7 · Teach — Records**
> Diagram D3: A record card titled "Pet" with five labelled field slots (name, species, age, weight, vaccinated), each slot coloured by data type (string green, integer blue, real purple, Boolean orange) and a key to the colours. Beside it, for contrast, a small array of 5 boxes all in one colour labelled "array: one data type".
- A **record** groups related data about one item under one name.
- Each item of data in a record is a **field**. Fields can have **different data types**.
- Compare: an array's elements all share one data type, but a record mixes types.
| Field | Data type | Example |
|---|---|---|
| name | String | 'Biscuit' |
| species | String | 'dog' |
| age | Integer | 4 |
| weight | Real | 12.5 |
| vaccinated | Boolean | True |

**10 · Quick check**
A club stores each member's name, age and whether they have paid. Which structure best holds one member's details?
- A. A 1D array of integers with three elements — *Array elements share one data type, but a name is a string and "paid" is a Boolean.*
- B. Three constants, one for each detail — *Constants cannot change while the program runs, and every member's details differ.*
- C. ✓ A record with name, age and paid fields — *Right: a record's fields can each have their own data type.*
- D. One string holding all three details — *The age could not be used as a number and "paid" would not be a Boolean.*

**11 · Mission check**
How can one name hold all 9 squares of a noughts and crosses board?
- A. A Boolean, as each square is either filled or empty — *A Boolean holds one value only, and a square has three states: X, O or empty.*
- B. A constant, as the board always has nine squares — *A constant cannot change while the program runs, but the squares change every turn.*
- C. A 1D array with one element for the whole board — *One element holds one value, so it cannot store nine squares.*
- D. ✓ A 2D array of 3 rows and 3 columns — *Right: one identifier holds all nine squares, each found by its row and column index.*
Shown after answering: Store the board as a 2D array: one identifier, 3 rows × 3 columns, so 9 elements of the same data type. Each square is reached with two indexes, row then column, counting from 0.

### Mission 4: Two subroutines both use a variable called total. Why no clash?  [module P4]

*Guess chips:* The second one overwrites the first · Each one only exists inside its own subroutine · The computer quietly renames one · I'm not sure yet

**1 · Teach — Subroutines**
> Diagram D1: Two columns: "main program" on the left with lines `welcome()` / `welcome()` (C/Q: `CALL Welcome` / `call Welcome`); the procedure box on the right. Blue arrow from each call to the top of the procedure, orange arrow from the end of the procedure back to the line after that call. Numbered 1–4 to show order.
- A **subroutine** is a named, out-of-line block of code. It runs when you **call** it by its name, then control returns to the line after the call.
- A **procedure** carries out a task. A **function** carries out a task and **returns a value**.
- Your board calls subroutines **sub programs**.
```
procedure welcome()
    print("Welcome to the quiz")
endprocedure

welcome()
welcome()
```

**2 · Teach — Parameters and return values**
- A **parameter** passes data into a subroutine when it is called. Values are matched to parameters **in order**.
- A function sends its result back with **return**. The returned value replaces the call, so store it or use it straight away.
```
function area(width, height)
    result = width * height
    return result
endfunction

roomArea = area(4, 5)
print(roomArea)    // 20
```

**3 · Answer**
```
function change(paid, price)
    return paid - price
endfunction

print(change(20, 13) * 2)
```

What is output when this code runs?
Accept: 14
Feedback (correct): Yes. paid takes 20 and price takes 13, so the function returns 7, and 7 × 2 = 14.
Feedback (wrong): Values go into parameters in order: paid = 20, price = 13. The function returns 20 − 13 = 7, which replaces the call, and then 7 × 2 = 14. (−14 means the order was swapped; 7 means the × 2 was missed.)

**4 · Teach — Local and global variables**
> Diagram D2: Nested boxes: a large box "main program" containing `bonus = 5` (global, green) and a smaller inner box "addBonus" containing `newScore` (local, orange). Green arrow shows bonus readable inside addBonus; a red crossed arrow shows `newScore` cannot be reached from the main program. Caption: "local: exists only while addBonus runs".
- A **local variable** is declared inside a subroutine: it **only exists while that subroutine runs** and is **only usable inside it**.
- A **global variable** is declared in the main program and can be used anywhere.
- Good practice: nothing outside can change a local variable, and its name can be reused elsewhere.
- Declare a global with the `global` keyword. Constants can also be local or global.
```
global bonus = 5
function addBonus(score)
    newScore = score + bonus    // newScore is local
    return newScore
endfunction

print(addBonus(10))    // 15
print(newScore)        // error: newScore does not exist here
```

**5 · Quick check**
A subroutine `calcTax` declares a local variable `tax` and returns its value. After calling `calcTax`, the main program tries to output `tax`. What happens?
- A. It outputs the last value that tax held inside calcTax — *A local variable is destroyed when its subroutine ends, so its value is gone.*
- B. ✓ An error, because tax does not exist outside calcTax — *Right: a local variable can only be used inside its own subroutine.*
- C. It outputs 0, because tax resets when the subroutine ends — *There is no variable called tax in the main program to reset, so nothing can be output.*
- D. It outputs the tax, because the value of tax was returned — *Return passes back a value, not the variable; the main program must store it, e.g. in a variable of its own.*

**6 · Teach — Why use subroutines?**
- **Reuse**: write code once and call it many times, so there is less to write and check.
- **Decomposition**: each subroutine solves one part and can be written and tested on its own.
- **Maintenance**: fix or improve the code in one place.
- Arrays can be passed into, and returned from, sub programs.

**7 · Quick check**
Which task should be written as a function rather than a procedure?
- A. Show the main menu on the screen — *This only outputs; there is no value to send back, so a procedure fits.*
- B. Print a welcome message with the player's name — *A parameter goes in, but nothing comes back; taking parameters does not make it a function.*
- C. Clear the screen before a new game starts — *This performs an action with no result to return, so a procedure fits.*
- D. ✓ Work out the VAT on a price and pass it back — *Right: it calculates a value that the calling code needs returned.*

**8 · Mission check**
Two subroutines both use a variable called total. Why no clash?
- A. The second subroutine overwrites the first one's total — *Each subroutine has its own separate total, so neither can overwrite the other.*
- B. The computer renames one of them when the program is translated — *Nothing is renamed; each variable exists only inside its own subroutine, so they never meet.*
- C. ✓ Each total is local, existing only inside its own subroutine — *Right: a local variable exists only while its subroutine runs and can only be used there.*
- D. Both are global, so they share one value safely — *A global total would be shared, so the two subroutines really would clash.*
Shown after answering: Each `total` is a local variable. It is created when its subroutine runs, can only be used inside that subroutine, and disappears when the subroutine ends. So the two variables never meet, which is why using local variables is good practice.

### Mission 5: How does an app show only the last 4 digits of your card number?  [module P5]

*Guess chips:* It only ever stores the last 4 digits · It measures the number's length and cuts out the end · It divides the number by 10,000 · I'm not sure yet

**1 · Teach — Strings have positions**
> Diagram D1: The string 4929123456789012 as a row of 16 boxes, one digit per box, with the index under each box. A bracket under the whole row labelled "length = 16".
- A **string** is a sequence of characters. Each character has a position, its **index**.
- The first character is at index 0, so the last is at length − 1.
- The **length** of a string is how many characters it holds, spaces included.
- A card number is stored as a string, not an integer: it is never used in arithmetic.
```
card = "4929123456789012"
print(card.length)
// prints 16
```

**2 · Teach — Taking a substring**
> Diagram D2: Same 16-box row; the last four boxes lifted out into a new row with "****" in front, forming ****9012. An arrow from "length − 4" to the first lifted box.
- A **substring** is part of a string, picked out by position.
- string.substring(x, i) starts at index x and takes i characters; .left(i) and .right(i) take characters from either end.
- Using the length makes the code work for any card length.
```
card = "4929123456789012"
last4 = card.substring(card.length - 4, 4)
print("****" + last4)
```

**3 · Answer**
```
word = "computer"
print(word.substring(3, 3))
```

Trace this code. What is output?
Accept: put
Feedback (correct): Yes. Counting from index 0, c-o-m-p-u-t-e-r gives index 3 = p, 4 = u, 5 = t.
Feedback (wrong): Write the indices under the letters first. c=0, o=1, m=2, p=3. Start at index 3 and take 3 characters: "put".

**4 · Teach — More string tools**
- **Concatenation** joins strings with +.
- .upper and .lower change case: "Hi".upper gives "HI".
- ASC("A") gives 65; CHR(97) gives "a".

**5 · Teach — Random numbers**
- Games, quizzes and simulations need unpredictable values, such as a dice roll.
- The range you give includes both ends: (1, 6) can give 1, 2, 3, 4, 5 or 6.
```
dice = random(1, 6)
print(dice)
```

**6 · Calculate**
```
print(random(5, 9))
```

How many different values can this code output?
Answer: 5  (accepted: [[5.0, 5.0]])
Feedback (correct): Right: 5, 6, 7, 8 and 9. Both ends of the range are included.
Feedback (wrong): List them: 5, 6, 7, 8, 9. That is 5 values, not 9 − 5 = 4, because both ends are included. The range (5, 9) includes 5 and 9.

**7 · Teach — Reading and writing files**
> Diagram D3: Flow: program box → "open" → file icon "scores.txt" with lines "Ann,35", "Ben,28", "Zara,42" → "read / write" arrows → "close". A dashed RAM box with a variable that empties when the program ends, beside the file that keeps its contents.
- Variables are lost when a program ends. A **file** in secondary storage keeps data, such as high scores, for next time.
- **Open** the file, **read** or **write** it, then **close** it so the data is saved and the file is freed.
- open() opens a file; .readLine() reads the next line; .writeLine() adds a line to the end; .endOfFile() is True after the last line; newFile() creates a file.
```
scores = open("scores.txt")
scores.writeLine("Zara,42")
scores.close()
scores = open("scores.txt")
while NOT scores.endOfFile()
  print(scores.readLine())
endwhile
scores.close()
```

**8 · Quick check**
A game keeps its high-score table in a variable. Every time the game closes, the scores vanish. What fixes this?
- A. Make the variable global, so it lasts after the program ends. — *Global variables can be used anywhere in the program, but they still vanish when it ends.*
- B. ✓ Save the scores to a file, then load them when the game starts. — *Correct: a file in secondary storage keeps data after the program ends.*
- C. Declare the scores as a constant, so the value cannot be lost. — *A constant only stops the value changing while the program runs; it is not saved.*
- D. Store the scores in a longer string, so they take up more memory. — *Size has nothing to do with it: all variables are cleared when the program ends.*

**9 · Mission check**
How does an app show only the last 4 digits of your card number?
- A. It stores only the last four digits of the card, so there is nothing else to show. — *The full number is stored; the display code picks out the end of it.*
- B. It takes a substring starting at position 4, because the last four digits always start there. — *Position 4 is near the start of the number, so that substring gives the wrong digits.*
- C. ✓ It uses the length to find the last four characters and takes that substring. — *Yes: length tells it where the end is, and a substring cuts out those four characters.*
- D. It turns the number into an integer and divides it by 10,000. — *Dividing keeps the front digits, not the last four, and card numbers are stored as strings anyway.*
Shown after answering: The card number is stored as a string. The program finds its length, works out that the last four characters start at length − 4 when counting from 0 (length − 3 when counting from 1), and takes that substring to show after the stars.

### Mission 6: How can one line of SQL find every overdue book in a library?  [module B2]

*Guess chips:* It needs a loop that checks each book · It names the fields, the table and a condition · It sorts the books, then reads off the top · I'm not sure yet

**1 · Teach — SELECT and FROM**
> Diagram D1: The Loan table exactly as on screen 1, with the Title and DaysLate columns highlighted, and an arrow to a two-column result table (Title, DaysLate) with all 6 rows in table order. Labels: "SELECT chooses columns", "FROM chooses the table".
- **SQL** (Structured Query Language) is used to search for data in a database.
- **SELECT** lists the fields you want to see, separated by commas.
- **FROM** names the table to search.
- This query shows the Title and DaysLate of every record in Loan:
```
SELECT Title, DaysLate
FROM Loan
```
| LoanID | Title | Genre | DaysLate | MemberID |
|---|---|---|---|---|
| L01 | Holes | Adventure | 0 | M01 |
| L02 | Wonder | Drama | 3 | M02 |
| L03 | Coraline | Fantasy | 0 | M03 |
| L04 | Skellig | Fantasy | 7 | M04 |
| L05 | Holes | Adventure | 2 | M05 |
| L06 | Matilda | Fantasy | 5 | M02 |

**2 · Teach — WHERE picks the records**
> Diagram D2: The Loan table with the three Fantasy rows highlighted (L03, L04, L06) and the other rows faded; arrow to the result table Title, DaysLate: Coraline 0, Skellig 7, Matilda 5. Label "WHERE keeps matching rows".
- **WHERE** gives a condition. Only records that meet it are returned.
- Compare with = < > <= >= and <> (not equal).
- Put text values in quotes: Genre = 'Fantasy'. Numbers need no quotes.
```
SELECT Title, DaysLate
FROM Loan
WHERE Genre = 'Fantasy'
```
Result: Coraline 0, Skellig 7, Matilda 5.

**3 · Answer**
```
SELECT LoanID
FROM Loan
WHERE DaysLate >= 5
```

Use the Loan table. What does this query return? Give the values in order, separated by commas.
Accept: L04, L06 | L04 L06 | L04,L06 | L04 and L06
Feedback (correct): Yes. Only L04 (7 days) and L06 (5 days) have DaysLate of 5 or more. Only the LoanID field is shown.
Feedback (wrong): Check DaysLate in each record against ">= 5": L01 0 no, L02 3 no, L03 0 no, L04 7 yes, L05 2 no, L06 5 yes (>= includes 5). SELECT LoanID means only the LoanID values are returned: L04, L06.

**4 · Teach — Writing a query**
- Read the question for the fields to show (SELECT), the table (FROM) and the rule (WHERE).
- Fields in WHERE do not have to appear in SELECT.
```
SELECT Title, Genre
FROM Loan
WHERE DaysLate > 4
```
Returns Skellig Fantasy and Matilda Fantasy.

**5 · Quick check**
Which query lists the titles of the books more than 4 days late?
- A. SELECT DaysLate FROM Loan WHERE Title > 4 — *This swaps the fields: it shows DaysLate and tests Title against a number.*
- B. ✓ SELECT Title FROM Loan WHERE DaysLate > 4 — *Correct: it shows Title, searches Loan and keeps records with DaysLate above 4.*
- C. SELECT Title FROM Loan WHERE DaysLate >= 3 — *>= 3 would also return Wonder, which is only 3 days late, not more than 4.*
- D. SELECT Loan FROM Title WHERE DaysLate > 4 — *SELECT needs field names and FROM needs the table; here they are swapped.*

**8 · Mission check**
How can one line of SQL find every overdue book in a library?
- A. It loops through the records, one line of SQL per book in the table — *SQL describes what you want; one query searches every record, however many there are.*
- B. It sorts all the books by DaysLate and then reads off the top few — *Sorting alone cannot know where "late" stops; a condition is still needed.*
- C. It returns the whole table, and the librarian then picks out the late ones — *That is what SQL avoids: WHERE does the picking.*
- D. ✓ SELECT names the fields, FROM the table, and WHERE keeps only late books — *Yes: WHERE DaysLate > 0 returns just the overdue records.*
Shown after answering: SELECT Title FROM Loan WHERE DaysLate > 0. SELECT chooses the fields to show, FROM names the table, and WHERE keeps only the records that meet the condition, however many records the table holds.

### Recap

- A variable is a named memory location whose value can change; a constant keeps one value while the program runs.
- Choose the data type that fits the data: integer, real, Boolean, character or string, and cast between types when needed (input text to an integer).
- Integer division gives the whole-number part; the remainder (modulus) gives what is left over.
- Sequence runs statements in order; selection uses a true/false condition to choose a branch (if or switch).
- Count-controlled loops repeat a fixed number of times; condition-controlled loops repeat until a condition changes, tested at the start or the end.
- In nested loops the inner loop runs fully for every pass of the outer loop.
- An array holds many values of one data type under one identifier; an index picks out an element (the first is index 0).
- A 2D array is a table of rows and columns, so each element needs two indexes.
- A record groups fields of different data types about one item.
- A subroutine is a named block of code called by its name; a function returns a value and a procedure does not.
- Parameters pass data in, in order; return passes a result back to the call.
- Local variables exist only inside their subroutine while it runs, so the same name can be reused safely; global variables can be used anywhere.
- A string is a sequence of characters, each with an index; the length is how many characters it has. Indexes start at 0.
- A substring picks out part of a string by position.
- Concatenation joins strings with +.
- Files keep data after a program ends: open, read or write, close.
- Random number functions give a value in a range, including both ends.
- SELECT fields FROM table WHERE condition: the fields to show, the table to search and the records to keep.

---

## Producing robust programs  (OCR GCSE Computer Science (J277) · 2.3)
Page: `computer-science-gcse-ocr-producing-robust-programs-mini-lesson.html`

### Mission 1: You typed 41, not 14, for your age. Why did the form accept it?  [module P6]

*Guess chips:* The form's checks must be broken · 41 looks like a real age, so it passes · Forms can't check numbers · I'm not sure yet

**1 · Teach — What validation does**
> Diagram D1: A form field "Age" feeding a box "Validation: range 0 to 120, presence". Three inputs: 41 → green tick "accepted"; 150 → red cross "out of range"; blank → red cross "nothing entered". A loop-back arrow from each cross to "ask again".
- **Validation** is an automatic check that input is sensible and follows rules before the program uses it.
- Invalid data is rejected, and the user is told why and asked again.
- It stops bad data causing crashes or wrong results later.
- Validation **cannot** tell whether data is correct: a mistyped value that still follows the rules gets through.

**2 · Teach — Types of validation check**
| Check | What it tests | Example |
|---|---|---|
| **Range check** | a number is between limits | age 0 to 120 |
| **Length check** | number of characters | password at least 8 |
| **Presence check** | something was entered (not empty) | surname not blank |

**3 · Quick check**
A field for a 4-digit PIN accepted 12. Which check would have rejected it?
- A. A range check that the PIN is a number from 0 to 9999 — *12 is between 0 and 9999, so a range check passes it.*
- B. A presence check that the PIN is not empty — *Something was entered, so a presence check passes it.*
- C. A check that the PIN contains only digits — *1 and 2 are both digits, so this check passes it.*
- D. ✓ A length check that the PIN has exactly 4 characters — *Correct: 12 has only 2 characters, so a length check rejects it.*

**4 · Teach — Writing a validation routine**
- Ask for input, test it, and keep asking until it passes.
- A loop does this: the user cannot move on with invalid data.
- This WHILE loop is a range check for 1 to 10.
```
score = int(input("Score 1 to 10: "))
while score < 1 OR score > 10
  score = int(input("Must be 1 to 10: "))
endwhile
```

**5 · Calculate**
```
name = input("Name: ")
while name.length < 3
  print("Too short")
  name = input("Name: ")
endwhile
print("Hello " + name)
```

The user types three names in this order: an empty string, Al, then Amir. How many times is "Too short" output?
Answer: 2  (accepted: [[2.0, 2.0]])
Feedback (correct): Yes. The empty string (length 0) and Al (length 2) both fail; Amir (length 4) passes, so "Hello Amir" follows.
Feedback (wrong): Trace each input: empty string, length 0 < 3, "Too short"; Al, length 2 < 3, "Too short"; Amir, length 4, not < 3, so the loop ends. That is 2 messages. An empty string still has a length (0), so it fails the check too.

**7 · Teach — Authentication**
> Diagram D3: Flowchart: input username/user ID, input password → decision "matches stored details?" → Yes: "Access granted"; No: "Access denied".
- **Authentication** confirms the identity of a user before they get access, e.g. with a username and password.
- The program compares what is typed with the stored details.
- **Anticipating misuse**: plan for every input a user might give, by mistake or on purpose, such as blank entries or repeated wrong passwords.
```
username = input("Username: ")
password = input("Password: ")
if username == "sam01" AND password == "Tr33house" then
  print("Access granted")
else
  print("Access denied")
endif
```

**8 · Quick check**
A programmer types OR instead of AND in the authentication condition. Which login is now wrongly granted access?
- A. Username SAM01 with password guess — *Comparisons are case-sensitive, so SAM01 does not match sam01; neither part matches, so even OR rejects it.*
- B. ✓ Username sam01 with password guess — *Correct: with OR, a right username alone is enough, so anyone who knows the username gets in.*
- C. Username sam01 with password Tr33house — *This is the real user's correct login, so it should be granted anyway.*
- D. Username guess with password guess — *Neither part matches, so even OR rejects it.*

**9 · Mission check**
You typed 41, not 14, for your age. Why did the form accept it?
- A. The range check was broken, so it let every number through without testing it. — *The form rejected 150, so the range check was working.*
- B. A presence check passed first, so the program skipped all the other checks. — *Programs can run several checks; 41 would pass a range check too.*
- C. ✓ 41 is a sensible age, so it passes; validation can't tell if data is correct. — *Yes: validation only tests that data follows the rules, and 41 does.*
- D. Forms can only validate text, so numbers like ages are never checked at all. — *Range checks are made for numbers, and this form rejected 150.*
Shown after answering: Validation checks that data is reasonable, such as an age from 0 to 120. 41 follows that rule, so it is accepted even though it is wrong. Only a person who knows the right answer can spot that 41 is the wrong age.

### Mission 2: It passed every test. So why did it fail for an 18-year-old?  [module P7]

*Guess chips:* 18 is an awkward number for computers · Nobody tested the exact edge, 18 · The computer made a random slip · I'm not sure yet

**1 · Teach — Why test?**
- **Testing** checks that a program works as intended and meets its requirements.
- It finds errors so they can be fixed before users meet them.
- A program can run without crashing and still give wrong results.
- Passing a few easy tests proves little: choose test data that could expose errors.
- **Iterative testing** tests each module while it is being written; **final (terminal) testing** tests the whole program at the end.

**2 · Teach — Normal, edge and wrong data**
> Diagram D1: A number line from −1 to 12 with the valid range 1 to 10 shaded green. Markers: 5 (normal), 1 and 10 at the limits, 0 and 11 just outside (red), 15 further out (red). A separate card labelled "ten" (text) off the line.
For a program that accepts whole numbers from 1 to 10:
- **Normal** data: sensible values that should be accepted, e.g. 5.
- **Boundary** data: the correct type, on the very edge of being valid: 1 and 10.
- **Invalid** data: the correct type but should be rejected, e.g. 15. **Erroneous** data: the wrong data type, e.g. ten.

**3 · Calculate**
```
age = int(input("Age: "))
if age > 18 then
  print("Adult ticket")
else
  print("Child ticket")
endif
```

The rule is "adult ticket for 18 and over". Tests with ages 10, 30 and 50 all gave the right ticket. Which single age would show the error?
Answer: 18  (accepted: [[18.0, 18.0]])
Feedback (correct): Yes. 18 > 18 is False, so an 18-year-old gets a child ticket. The condition should be "age ≥ 18" (age >= 18).
Feedback (wrong): Test the edge of the rule. For 17, both the rule and the code give a child ticket; for 19, both give an adult ticket. Only at 18 do they disagree: the rule says adult, but 18 > 18 is False, so the code says child.

**4 · Quick check**
A program accepts whole numbers from 1 to 10. A tester types the word ten. What type of test data is this?
- A. Normal data — *Ten means 10 to a person, but the program expects a number, so the word must be rejected.*
- B. Boundary data — *10 is at the edge of the range, but the word ten is not a number at all.*
- C. ✓ Erroneous data — *Correct: it should be rejected. It is the wrong data type, so it is erroneous; invalid data would be the right type, e.g. 15.*
- D. Not useful test data, as the program may just crash — *Finding out whether it crashes is exactly why you test with data that should be rejected.*

**5 · Teach — Types of error**
- A **syntax error** breaks the rules of the language, e.g. a missing bracket. The program cannot be translated or run.
- A **logic error** lets the program run, but it gives the wrong or unexpected result, e.g. > where ≥ was needed.
- Testing with good test data is how you find logic errors.

**6 · Quick check**
A program should output the average of three marks, 60, 70 and 80. It runs, but outputs 156.67 because the code says a + b + c / 3. What kind of error is this?
- A. A syntax error, because the brackets are missing — *The line follows the rules of the language, so it translates and runs.*
- B. ✓ A logic error: it runs, but the result is wrong — *Correct: only c is divided by 3; it should be (a + b + c) / 3.*
- C. No error, because the program runs and outputs a number — *Running is not enough: the output should be 70, so there is an error.*
- D. Erroneous data, because the marks typed in were wrong — *The marks 60, 70 and 80 are sensible; the fault is in the code.*

**7 · Teach — Test plans**
> Diagram D2: The test plan table drawn as a document, with the Actual column filled in by hand-style text; test 2's row highlighted red where expected ≠ actual.
- A **test plan** lists each test before it is run: what it tests, the test data, its type and the **expected result**.
- After running, record the **actual result**. If they differ, fix the code and test again.
| Test | Data | Type | Expected | Actual |
|---|---|---|---|---|
| 1 | 5 | Normal | Accepted | Accepted |
| 2 | 10 | Boundary | Accepted | Rejected |
| 3 | 11 | Invalid | Rejected | Rejected |
| 4 | ten | Erroneous | Rejected | Rejected |
- Test 2 failed, so the range check needs fixing.

**8 · Teach — Code that is easy to maintain**
- Other people (and you, later) must be able to read and change code. This is **maintainability**.
- **Naming conventions**: totalScore, not t.
- **Comments** explain what each part of the code does.
- **Indentation** shows which lines belong inside loops, selection and subprograms.
- **Sub programs** break code into named, reusable parts.

**9 · Mission check**
It passed every test. So why did it fail for an 18-year-old?
- A. ✓ No test used 18 itself, so the wrong comparison (> not ≥) went unseen. — *Yes: only a test at the edge of the rule shows the error.*
- B. Computers sometimes make random mistakes with even numbers like 18. — *Computers follow the code exactly; the same input always gives the same result.*
- C. Too few tests were run; 100 random ages would surely have found it. — *Random ages could easily miss 18; choosing the edge value matters more than how many tests.*
- D. 18 is outside the valid range, so a child ticket was the right output. — *18 is a valid age that should get an adult ticket; it sits exactly on the limit.*
Shown after answering: The code used > 18 when the rule needed ≥ 18, a mistake that only shows at exactly 18. Testing 10, 30 and 50 only tried normal values; a test at the edge of the range would have caught it.

### Recap

- Validation automatically checks input is sensible, e.g. range, length and presence checks, and rejects data that breaks the rules; it cannot check data is correct.
- Authentication confirms who a user is, e.g. by matching a username and password.
- Choose test data of every kind: normal, at the edges of the range, and data that should be rejected (normal, boundary, invalid, erroneous).
- Syntax errors stop a program running; logic errors give wrong results.
- Meaningful names, comments, indentation and subprograms make code easy to maintain.

---

## Boolean logic  (OCR GCSE Computer Science (J277) · 2.4)
Page: `computer-science-gcse-ocr-boolean-logic-mini-lesson.html`

### Mission 1: "Tea or coffee?" Would a computer's OR let you have both?  [module L1]

*Guess chips:* Yes, OR allows both · No, OR means only one · Only if you use AND instead · I'm not sure yet

**1 · Teach — 1 or 0, and NOT**
> Diagram D1: NOT truth table: columns A, NOT A; rows 0→1, 1→0. Input column in grey, output column in teal. Column header per board: A Q "A̅" (overbar) with "NOT A" beneath; O "NOT A" (with "¬A" small beneath); E C I "NOT A".
- A **Boolean** value has only two states: 1 (TRUE) or 0 (FALSE).
- A **truth table** lists every possible combination of inputs with the output for each.
- **NOT** has one input and reverses it: NOT 0 = 1, NOT 1 = 0.
- NOT A is also called **negation**; ¬A is accepted too.

**2 · Teach — AND**
> Diagram D2: Truth tables in the order 00, 01, 10, 11. Screen 2: AND (0,0,0,1); screen 3: OR (0,1,1,1); screen 5: XOR (0,1,1,0). Output cells that are 1 highlighted in teal. Header per board: A Q "A.B", "A + B", "A ⊕ B"; O "A AND B" / "A OR B" (∧/∨ small beneath); E C I words; C "A XOR B".
- **AND** has two inputs. The output is 1 only when **both** inputs are 1.
- If either input is 0, the output is 0.
- AND is also called **conjunction**; A ∧ B is accepted too.
| A | B | A AND B |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**3 · Teach — OR**
> Diagram D2: Truth tables in the order 00, 01, 10, 11. Screen 2: AND (0,0,0,1); screen 3: OR (0,1,1,1); screen 5: XOR (0,1,1,0). Output cells that are 1 highlighted in teal. Header per board: A Q "A.B", "A + B", "A ⊕ B"; O "A AND B" / "A OR B" (∧/∨ small beneath); E C I words; C "A XOR B".
- **OR** has two inputs. The output is 1 when **at least one** input is 1.
- The output is 0 only when both inputs are 0.
- This is wider than everyday "or", which often means "one or the other, not both".
- OR is also called **disjunction**; A ∨ B is accepted too.
| A | B | A OR B |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

**4 · Answer**
A = 1 and B = 0. Work out NOT A, then A AND B, then A OR B. Type the three output bits in that order.
Accept: 001 | 0 0 1 | 0,0,1
Feedback (correct): Right. NOT 1 = 0. A AND B = 0 because B is 0. A OR B = 1 because A is 1.
Feedback (wrong): NOT reverses A, so NOT 1 = 0. AND needs both inputs to be 1, and B is 0, so A AND B = 0. OR needs at least one 1, and A is 1, so A OR B = 1. The answer is 001.

**7 · Teach — Logic gate symbols**
> Diagram D3: Gate symbols (ANSI distinctive shape), each labelled with its name and a mini truth table beside it: AND (D shape), OR (shield shape), NOT (triangle + bubble). For A and C only, add XOR (OR shape with an extra curved line at the input side). O version: AND, OR, NOT only. Inputs labelled A, B on the left; output Q on the right.
- A **logic gate** is a circuit that carries out one logical operator.
- **AND**: flat back, rounded front, two inputs.
- **OR**: curved back, pointed front, two inputs.
- **NOT**: a triangle with a small circle at the output. The circle means "reverse".
- Inputs enter on the left; the output leaves on the right.

**8 · Quick check**
A cash machine gives out money only if the card is valid (V) and the PIN is correct (P). Which logic statement matches?
- A. V OR P — *OR would pay out with a valid card and the wrong PIN, because only one input needs to be 1.*
- B. NOT V AND P — *NOT V means the card is **not** valid, so this pays out for invalid cards.*
- C. ✓ V AND P — *Correct. AND gives 1 only when both conditions are 1.*
- D. V OR NOT P — *This pays out whenever the PIN is wrong, which is the opposite of what is needed.*

**9 · Mission check**
"Tea or coffee?" A customer ticks both, so Tea = 1 and Coffee = 1. What does Tea OR Coffee give?
- A. 0, because OR means one or the other but not both — *That is everyday "or". The computer's OR does not have a "not both" rule.*
- B. ✓ 1, because OR gives 1 when at least one input is 1 — *Correct. Both inputs are 1, so at least one is 1 and the output is 1.*
- C. 0, because only AND can give 1 when both inputs are 1 — *AND and OR both give 1 when both inputs are 1. They differ on the rows with one 1.*
- D. 0, because 1 + 1 gives 0 with a carry of 1 — *That is binary addition, not a logical operator. OR has no carry.*
Shown after answering: Yes. A computer's OR gives 1 when at least one input is 1, and that includes when both are 1. The output is 0 only when both inputs are 0.

### Mission 2: Three sensors, one alarm: how many cases must you test?  [module L2]

*Guess chips:* 3 · 6 · 8 · I'm not sure yet

**1 · Teach — Combining operators**
- One **logic statement** (expression) can use several operators, e.g. (A AND B) OR NOT C.
- Work out **brackets** first.
- NOT applies only to the input or bracket just after it.
- Example: (1 AND 0) OR (1 AND 1) = 0 OR 1 = 1

**2 · Teach — Every combination of three inputs**
> Diagram D1: Three stacked mini tables: 1 input (0,1), 2 inputs (00–11), 3 inputs (000–111), with a "×2" arrow between each. Input bits counted in binary order; the rightmost column alternates 0,1; the middle column in pairs; the left column in fours (shade the groups lightly).
- Each input can be 0 or 1, so each new input **doubles** the number of rows.
- 1 input: 2 rows. 2 inputs: 4 rows. 3 inputs: 8 rows.
- Fill the input columns by **counting up in binary** from 000 to 111. Then no row is missed or repeated.

**3 · Teach — Working columns**
> Diagram D2: The full truth table from screen 3: A, B, C, A AND B, NOT C, P. Input columns grey, working columns light blue, P column teal. A Q headers: "A.B", "C̅", "P = A.B + C̅"; other boards words.
- For a long statement, add a column for each part.
- Example: P = (A AND B) OR NOT C.
- Column 4: A AND B. Column 5: NOT C. Column 6: P = column 4 OR column 5.
- Working columns are optional, but they stop you mixing up steps.
| A | B | C | A AND B | NOT C | P |
|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 1 | 1 |
| 0 | 0 | 1 | 0 | 0 | 0 |
| 0 | 1 | 0 | 0 | 1 | 1 |
| 0 | 1 | 1 | 0 | 0 | 0 |
| 1 | 0 | 0 | 0 | 1 | 1 |
| 1 | 0 | 1 | 0 | 0 | 0 |
| 1 | 1 | 0 | 1 | 1 | 1 |
| 1 | 1 | 1 | 1 | 0 | 1 |

**4 · Answer**
Q = (A OR B) AND NOT C. Complete the output column for the rows 000, 001, 010, 011, 100, 101, 110, 111 (in that order). Type the 8 bits.
Accept: 00101010 | 0010 1010
Feedback (correct): Right. Q is 1 only when at least one of A and B is 1 and C is 0: rows 010, 100 and 110.
Feedback (wrong): Work out A OR B: 0,0,1,1,1,1,1,1. Work out NOT C: 1,0,1,0,1,0,1,0. AND them row by row: 0,0,1,0,1,0,1,0. The answer is 00101010.

**5 · Teach — From a problem to a logic statement**
- Give each condition a letter (1 = true, 0 = false).
- "and" → AND; "or" / "either" → OR; "not" / "is off" → NOT.
- Use brackets to group conditions that go together.
- Example: the alarm X sounds if the door is open (D) and the system is armed (S), or if the panic button (P) is pressed.
- X = (D AND S) OR P

**6 · Quick check**
A greenhouse sprinkler W switches on when the soil is dry (D) and it is not raining (R), or when the manual override (M) is pressed. Which logic statement matches?
- A. W = D AND (NOT R OR M) — *Brackets are in the wrong place: the override would not work when the soil is wet (D = 0).*
- B. W = (D OR NOT R) AND M — *This needs the override every time, so dry soil with no rain would never switch it on by itself.*
- C. ✓ W = (D AND NOT R) OR M — *Correct. Dry and not raining is one bracket; the override is a separate OR condition.*
- D. W = (D AND R) OR M — *This waters when it **is** raining. The problem says "not raining", so R needs NOT.*

**7 · Teach — Logic circuits**
> Diagram D3: Alarm circuit: inputs D and S into an AND gate; its output and input P into an OR gate; output X. Label the wire between the gates "D AND S" (AQA version: "D.S"). ANSI symbols.
- A **logic circuit** joins gates with wires, inputs on the left. Each gate's output feeds the next gate.
- To write the expression, work from the inputs to the output, one gate at a time.
- The alarm X = (D AND S) OR P is an AND gate (inputs D, S) feeding an OR gate with P.

**8 · Quick check**
> Diagram D4: Circuit: input A into a NOT gate; NOT output and input B into an AND gate; AND output and input C into an OR gate; output Q. ANSI symbols, inputs A, B, C on the left in that order top to bottom.
Look at the circuit in the diagram. Which logic statement does it represent?
- A. NOT A OR (B AND C) — *The NOT output goes into the AND gate with B, not into the OR gate.*
- B. ✓ (NOT A AND B) OR C — *Correct. NOT A and B go into the AND gate; its output and C go into the OR gate.*
- C. NOT A AND B AND C — *The last gate is OR, so C is joined with OR, not AND.*
- D. NOT A AND (B OR C) — *That would need B and C to go into the OR gate first; here B goes into the AND gate.*

**9 · Mission check**
Three sensors, one alarm. How many different input combinations must the truth table cover?
- A. 3 — *That is one row per sensor, but each sensor can be on or off in any mix with the others.*
- B. 6 — *That is 3 sensors × 2 states. The states combine, so you multiply 2 × 2 × 2, not 3 × 2.*
- C. 9 — *That is 3 × 3. Each sensor has only 2 states, not 3.*
- D. ✓ 8 — *Correct. Each sensor doubles the rows: 2 × 2 × 2 = 8, from 000 to 111.*
Shown after answering: 8. Each sensor can be 0 or 1, so each one doubles the number of cases: 2 × 2 × 2 = 8. Counting in binary from 000 to 111 lists all 8 rows, so no case is missed.

### Recap

- Every input and output is 1 (TRUE) or 0 (FALSE). A truth table lists every combination of inputs.
- AND: 1 only if both inputs are 1. OR: 1 if at least one input is 1. NOT: reverses its one input.
- Work out brackets first; NOT applies only to what comes straight after it.
- 3 inputs give 8 rows: count in binary from 000 to 111, and add working columns for each part.
- Turn a problem into a statement by giving each condition a letter and mapping "and", "or", "not".
- In a circuit, each gate's output feeds the next gate; read it from inputs to output.

---

## Programming languages and IDEs  (OCR GCSE Computer Science (J277) · 2.5)
Page: `computer-science-gcse-ocr-programming-languages-ides-mini-lesson.html`

### Mission 1: Why write a 1999 hit game almost entirely in assembly?  [module S2]

*Guess chips:* It let the game run fast on PCs of the time · Assembly was easier to read than other languages · PCs then couldn't run high-level languages · I'm not sure yet

**1 · Teach — What the processor actually runs**
> Diagram D1: Three binary instructions in a column, each 8 bits split 4 + 4 (opcode, operand): 0001 0100, 0011 0101, 0010 0110, with a small label "illustrative 8-bit instruction set". Arrow into a CPU chip.
- A CPU can only execute **machine code**: instructions in **binary**.
- Each instruction is a simple step, such as load a value, add, store a result or jump.
- Each processor family has its own **instruction set**, so machine code for one family won't run on another.
- Machine code and assembly language are **low-level languages**: they work directly with the processor's own instructions.

**2 · Teach — Assembly language**
> Diagram D2: Two columns joined by straight one-to-one arrows: LDA price ↔ 0001 0100; ADD tax ↔ 0011 0101; STA total ↔ 0010 0110. Header "Assembly" and "Machine code". For A C Q I a box labelled "assembler" sits on the arrows; for O E no assembler box, just the arrows labelled "matches".
- **Assembly language** replaces binary with short **mnemonics** such as LDA (load), ADD and STA (store).
- Each assembly instruction matches exactly one machine code instruction: a **1:1** correspondence.
- Like machine code, it is specific to one processor family.
```
LDA price    ; load price into the processor
ADD tax      ; add tax to it
STA total    ; store the result in total
```

**3 · Teach — High-level languages**
- **High-level languages** use English-like keywords and maths-style expressions.
- One statement often becomes several machine code instructions: the line below becomes the three assembly instructions you just met.
- They are **machine independent**: the same source code can be translated to run on different processor families.
- A compiler or interpreter must translate the code before the CPU can run it.
- Most programs are high-level: they are quicker to write, read and debug.
```
total = price + tax
```

**4 · Quick check**
A programmer writes the line `STA total`. What kind of code is this?
- A. High-level code, because it uses a variable name — *Low-level code can use labels for memory too; STA is a mnemonic, not an English-like statement.*
- B. Machine code, because it is one processor instruction — *Machine code is written in binary, not letters.*
- C. Pseudocode, because it is a short, readable step — *Pseudocode describes an algorithm; STA is a real processor mnemonic.*
- D. ✓ Assembly language, because it uses a mnemonic — *Right: STA (store) is a mnemonic for one machine code instruction.*

**5 · Calculate**
An assembly program has these 3 lines: `LDA price`, `ADD tax`, `STA total`. How many machine code instructions will it become?
Answer: 3  (accepted: [[3.0, 3.0]])
Feedback (correct): Right: assembly has a 1:1 correspondence with machine code, so 3 lines give 3 instructions.
Feedback (wrong): Each assembly instruction matches exactly one machine code instruction. 3 lines → 3 machine code instructions.

**6 · Teach — Choosing a level**
> Diagram D3: Ladder of levels: High-level (e.g. total = price + tax) at top, Assembly (LDA/ADD/STA) in the middle, Machine code (binary) at bottom, with "easier for humans" up-arrow on the left and "closer to the hardware" down-arrow on the right.
|  | High-level | Low-level |
|---|---|---|
| Reading and writing | easier: English-like | harder: mnemonics or binary |
| Debugging | easier to find and fix errors | harder |
| Portability | machine independent | works on one processor family |
| Hardware control | indirect, through the OS | direct control of registers and memory |
| Speed and memory | translated code may be less efficient | can be very fast and compact |
- Use low-level for device drivers, embedded systems and code where speed or memory is critical.
- Use high-level for most applications, where quick development matters more.

**7 · Quick check**
A smart thermostat has a tiny chip with very little memory, and its program must control a temperature sensor directly. Which level of language suits it best?
- A. High-level, because the code could be moved to other chips later — *Portability isn't the priority here; tight memory and hardware control are.*
- B. ✓ Low-level, as it controls hardware directly with compact code — *Right: embedded systems often need direct hardware access and small, fast code.*
- C. High-level, because it always runs faster than low-level code — *It's usually the other way round: well-written low-level code is often faster.*
- D. Low-level, because it is easier for other programmers to read — *Low-level code is harder to read; that is one of its drawbacks.*

**8 · Mission check**
Why write a 1999 hit game almost entirely in assembly?
- A. Assembly was easier to read and debug than other languages — *Assembly is harder to read and debug; that's its main drawback.*
- B. PCs in 1999 couldn't run programs from high-level languages — *High-level languages such as C were widely used then; 1% of the game was in C.*
- C. ✓ It let the code run fast and lean on the PCs of that time — *Right: with direct control of the processor, the game could simulate a busy park on slow hardware.*
- D. Assembly code runs unchanged on every type of processor — *The opposite: assembly only works on one processor family.*
Shown after answering: Assembly gives the programmer direct control of the processor's own instructions, so the code can be very fast and compact. Its creator said a high-level language would have run too slowly on the PCs of 1999, or forced a simpler game [S8]. The price was code that is much harder to write, read and debug.

### Mission 2: Why do some languages show all your errors, and others just one?  [module S3]

*Guess chips:* One translates all the code first, one goes line by line · Some languages have stricter spell-checkers · One sends your code to a faster processor · I'm not sure yet

**1 · Teach — Why translate?**
> Diagram D1: Flow: "Source code" (page icon) → "Translator" (cog) → "Machine code" (binary) → CPU. Below, lanes: High-level → Compiler / Interpreter; for A C Q I a third lane Assembly → Assembler.
- The CPU can only execute machine code, so the **source code** that programmers write must be **translated** first.
- A **translator** is a program that converts source code into a form the CPU can execute.
- High-level code is translated by a **compiler** or an **interpreter**.

**2 · Teach — Compiler or interpreter?**
> Diagram D2: Two timelines for the same 8-line program. Compiler: all 8 lines go into a "translate" block, then an "executable" file icon, then "run". Interpreter: line 1 translate→run, line 2 translate→run, … stepping along.
- A **compiler** translates the **whole** program before it runs, producing an **executable file** of machine code that runs without the compiler.
- An **interpreter** translates and runs the code one line at a time. It is needed every time the program runs.
- Errors: a compiler gives an **error report** for the whole program; an interpreter **stops** at the first error.

**3 · Quick check**
An 8-line program has errors on lines 4 and 7. What happens when you run it with an interpreter?
- A. It reports both errors, on lines 4 and 7, before anything runs — *That's what a compiler does: it translates everything first and reports all the errors it finds.*
- B. ✓ Lines 1 to 3 run, then it stops and reports the error on line 4 — *Right: an interpreter works line by line and stops at the first error it reaches.*
- C. It skips lines 4 and 7 and runs all the other lines as normal — *An interpreter doesn't skip errors; it stops at the first one.*
- D. It makes an executable file with lines 4 and 7 left out — *An interpreter never produces an executable file.*

**4 · Teach — Choosing a translator**
> Diagram D3: Two cartoon scenes beside the table: developer at a desk using the interpreter (edit, run, fix loop arrow), and a "release" box with an .exe icon shipped to users from the compiler.
|  | Compiler | Interpreter |
|---|---|---|
| Translates | the whole program, before it runs | one line at a time, as it runs |
| Produces | an executable file | no executable file |
| Running speed | fast: already translated | slower: translated again every run |
| Finding errors | report after translating everything | stops at the error, easy to see where |
| After a change | must recompile the whole program | just run it again |
| Sharing | send the executable; source stays private | users need the source and an interpreter |
- An interpreter is mostly used while developing and testing a program; a compiler translates the final program for release.

**5 · Quick check**
A games studio is ready to release its finished game and doesn't want players to see its source code. Which translator should it use?
- A. An interpreter, so the game can run on any computer instantly — *Players would then need both the source code and an interpreter.*
- B. ✓ A compiler, to turn the code into one executable file to ship — *Right: players get machine code to run, so the source code stays private.*
- C. A compiler, because it translates each line just as it is run — *Right translator, wrong reason: a compiler translates the whole program before it runs.*
- D. An interpreter, because it hides each line once it is translated — *An interpreter needs the source code every time, so nothing is hidden.*

**9 · Mission check**
Why do some languages show all your errors, and others just one?
- A. Compiled languages have a much stricter spell-checker built into them — *Both kinds check the language's rules; the difference is when translation happens.*
- B. An interpreter deletes the rest of the program after one error — *Nothing is deleted; it simply stops running at the first error.*
- C. An interpreter runs on a slower processor that finds fewer errors — *Both run on the same CPU; the interpreter just translates line by line.*
- D. ✓ A compiler translates it all first; an interpreter stops at an error — *Right: whole-program translation lets a compiler report every error it finds.*
Shown after answering: A compiler translates the whole program before it runs, so it can list every error it finds in one report. An interpreter translates and runs one line at a time, so it stops as soon as it reaches the first error.

### Mission 3: How can a program tell you which line your bug is on?  [module S5]

*Guess chips:* The IDE's tools check the code and report the line · The computer guesses from where you last typed · The CPU keeps a list of every line it ran · I'm not sure yet

**1 · Teach — One program for writing, running and fixing code**
> Diagram D1: Mock IDE window: editor pane with line numbers 1–5 and colour-coded keywords (keywords purple, strings green), a Run button (labelled "translator"), an output pane and an error pane (empty). For O C label the output pane "run-time environment".
- An **Integrated Development Environment (IDE)** is software that puts tools for writing, translating, running and debugging code in one place.
- The **editor** is where you write and edit code. It shows line numbers, colours keywords and indents code automatically, so code is easier to read.

**2 · Teach — Translate, run and diagnose**
- The IDE includes a **translator**, so you can **compile or interpret** your code with one click.
- The **run-time environment** runs your program inside the IDE: you see its output and enter input, and if it crashes the IDE shows what went wrong.
- **Error diagnostics** report each error with a message and its line number, and highlight that line.

**3 · Calculate**
```
total = 0
for i = 1 to 3
    total = total + i
nxt i
print(total)
```

You run this program in an IDE. Which line number will the error diagnostics highlight?
Answer: 4  (accepted: [[4.0, 4.0]])
Feedback (correct): Right: line 4 has a misspelt keyword, so the error message points to line 4.
Feedback (wrong): Count the lines from 1. Lines 1–3 follow the rules; line 4 misspells next, so that is the line reported.

**4 · Teach — Debugging tools**
> Diagram D2: Same window paused: red breakpoint dot beside line 3, line 3 highlighted yellow, watch panel listing "i = 2, total = 1", Step button.
- A **breakpoint** pauses the program at a chosen line, before that line runs.
- **Stepping** runs the program one line at a time, so you can follow the path it takes.
- A **variable watch** shows the current value of chosen variables while the program runs.

**5 · Calculate**
```
total = 0
for i = 1 to 3
    total = total + i
next i
print(total)
```

The corrected program below has a breakpoint on line 3 and a watch on `total`. The program pauses each time it reaches line 3. What does the watch show for `total` at the **third** pause?
Answer: 3  (accepted: [[3.0, 3.0]])
Feedback (correct): Right: at the third pause i = 3 but line 3 hasn't run yet, so total is 0 + 1 + 2 = 3.
Feedback (wrong): A breakpoint pauses before its line runs. Pauses: (i = 1, total = 0), (i = 2, total = 1), (i = 3, total = 3). The final output, 6, comes later.

**9 · Quick check**
A classmate's long program has no indentation and is hard to follow. Which IDE feature helps most?
- A. The run-time environment, to run the code and see its output — *Running it shows what it does, not how its structure is laid out.*
- B. The translator, to turn the code into machine code faster — *Translation doesn't make source code easier for a person to read.*
- C. ✓ The editor's automatic indentation of each code block — *Right: indentation shows where each loop and selection block starts and ends.*
- D. Error diagnostics, to report the line numbers of any errors — *The code may have no errors at all; its layout is the problem, not its rules.*

**10 · Mission check**
How can a program tell you which line your bug is on?
- A. The CPU remembers every line it ran and prints the last one — *The CPU runs machine code; it doesn't keep your source lines.*
- B. The editor guesses the line from where you last typed — *The reported line can be anywhere, not just where you were typing.*
- C. ✓ The translator checks it and error diagnostics name the line — *Right: the error message gives the line number and the editor highlights it.*
- D. The run-time environment rewrites the line that went wrong — *It runs your code but never rewrites it; you fix the line yourself.*
Shown after answering: The IDE translates your code, and when the translator (or the running program) hits a problem, the error diagnostics report a message with the line number. Because the editor numbers every line, you can go straight to the bug.

### Recap

- The CPU only runs machine code (binary); assembly uses mnemonics with a 1:1 match to machine code. Both are low-level and tied to one processor family.
- High-level languages are easier to write, read and debug and are machine independent, but must be translated.
- Low-level suits device drivers, embedded systems and speed-critical code; high-level suits most applications.
- Source code must be translated before the CPU can run it: a compiler translates the whole program into an executable; an interpreter translates and runs it line by line.
- Interpreters suit development and testing; compilers suit the final program.
- An IDE puts an editor, a translator, a run-time environment and error diagnostics in one program.
- Editor features such as line numbers, colour coding and automatic indentation make code easier to write and read.
- Breakpoints, stepping and variable watches help you find logic errors while the program runs.

---
