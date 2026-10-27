# Cambridge IGCSE: GCSE Computer Science lesson content (for checking)

Generated from the same resolved module content the pages are built from. Diagrams are described by their plan text. ✓ marks the key.

## Data representation  (Cambridge IGCSE Computer Science (0478/0984) · Topic 1)
Page: `computer-science-gcse-cambridge-igcse-data-representation-mini-lesson.html`

### Mission 1: Web colours look like #FF8C00. Why letters and numbers?  [module D1]

*Guess chips:* It's binary written in a shorter form · The letters are colour names in code · The computer stores the colour as text · I'm not sure yet

**1 · Teach — Everything is binary**
> Diagram D1: A row of 8 switches (off/on) above the bits 0 1 0 0 0 0 0 1, with three arrows from the same pattern to "65", "A" and "a pixel colour"
- A computer is built from billions of tiny switches, each off or on. So it stores and processes everything in **binary**: 0s and 1s.
- Numbers, text, images, sound and program **instructions** are all binary patterns.
- One pattern can mean a number, a letter or a colour.
- **Logic gates** process the data and **registers** hold it.
- A **bit** is a single 0 or 1.

**2 · Teach — Binary place values**
> Diagram D2: 8-bit place-value grid: header row 128 64 32 16 8 4 2 1; bit row 0 1 1 0 1 0 0 1; columns holding 1 highlighted (teal) with their values gathered below: 64 + 32 + 8 + 1 = 105. Labels "MSB" under the 128 column and "LSB" under the 1 column.
- **Denary** (base 10) columns go 1, 10, 100. **Binary** (base 2) columns double: 1, 2, 4, 8…
- Add columns holding 1: 0110 1001 = 64 + 32 + 8 + 1 = 105.
- Leftmost bit: **most significant bit (MSB)**. Rightmost: **least significant bit (LSB)**.
- Each extra bit doubles the patterns: 8 bits give 256 (0 to 255).
- Leading zeros change nothing: 11010 = 0001 1010.
- Up to 16 bits: columns continue 256, 512 … 32,768.
| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|---|---|---|---|---|---|---|---|
| 0 | 1 | 1 | 0 | 1 | 0 | 0 | 1 |

**3 · Calculate**
Convert the 16-bit binary number 0000 0001 1001 0110 to denary.
Answer: 406  (accepted: [[406.0, 406.0]])
Feedback (correct): Yes. 256 + 128 + 16 + 4 + 2 = 406.
Feedback (wrong): The ninth column from the right is worth 256. The 1s sit under 256, 128, 16, 4 and 2, so 256 + 128 + 16 + 4 + 2 = 406. If you got 150, you missed the 1 in the 256 column.

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
- Every device has a limit: 16 bits hold at most 65,535.

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

### Mission 3: A one-byte thermometer must show −20 °C. Where does the minus sign go?  [module D3]

*Guess chips:* Into the leftmost bit of the byte · Into an extra ninth bit · Stored as a '−' character first · I'm not sure yet

**1 · Teach — A bit for the sign**
> Diagram D1: An 8-box byte with the MSB box highlighted (purple) and labelled "sign bit: 0 = +, 1 = −"; the other 7 boxes plain. For Q and I only, a second row: sign and magnitude +53 = 0011 0101 and −53 = 1011 0101, with the 7 magnitude bits bracketed "size = 53".
- 8 bits counting up from 0 hold 0 to 255: **unsigned** integers, with no minus sign.
- A **signed** integer gives the **most significant bit (MSB)** a new job: the sign. 0 = positive, 1 = negative.
- Computers mostly use **two's complement**.

**2 · Teach — Two's complement**
> Diagram D2: Two's complement place-value grid with header −128 64 32 16 8 4 2 1 (the −128 in red) and bits 1111 1011 = −5. Beside it the flip-and-add-1 steps as three stacked rows: 0000 0101 → 1111 1010 → 1111 1011, with "flip" and "+1" labels. On screen 4 (E C I) add a number line from −128 to +127 marking 1000 0000, 1111 1111, 0000 0000 and 0111 1111.
- In **two's complement** the MSB is worth **−128**. Other columns keep their values.
- 1111 1011 = −128 + 64 + 32 + 16 + 8 + 2 + 1 = −5.
- Positive numbers look the same as unsigned: +5 = 0000 0101.
- To make a negative: write the positive, **flip every bit**, **add 1**: 0000 0101 → 1111 1010 → 1111 1011.
- 8-bit range: −128 to +127.
| −128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|---|---|---|---|---|---|---|---|
| 1 | 1 | 1 | 1 | 1 | 0 | 1 | 1 |

**3 · Answer**
Write −20 as an 8-bit two's complement binary number.
Accept: 1110 1100 | 11101100
Feedback (correct): Right. −128 + 64 + 32 + 8 + 4 = −20.
Feedback (wrong): Start with +20 = 0001 0100. Flip every bit: 1110 1011. Add 1: 1110 1100. Check: −128 + 64 + 32 + 8 + 4 = −20. If you got 1110 1011, you forgot to add 1; if you got 1001 0100, you only changed the sign bit.

**4 · Teach — Range and reading back**
> Diagram D2: Two's complement place-value grid with header −128 64 32 16 8 4 2 1 (the −128 in red) and bits 1111 1011 = −5. Beside it the flip-and-add-1 steps as three stacked rows: 0000 0101 → 1111 1010 → 1111 1011, with "flip" and "+1" labels. On screen 4 (E C I) add a number line from −128 to +127 marking 1000 0000, 1111 1111, 0000 0000 and 0111 1111.
- 8-bit two's complement holds **−128 to +127**: 1000 0000 = −128, 1111 1111 = −1, 0111 1111 = +127.
- If the MSB is 1, the number is negative.
- To read it, add −128 to the other place values. Or flip every bit, add 1, and put a minus sign on the result.

**5 · Calculate**
1011 0101 is an 8-bit two's complement number. What is it in denary?
Answer: −75  (accepted: [[-75.0, -75.0]])
Feedback (correct): Correct. −128 + 32 + 16 + 4 + 1 = −75.
Feedback (wrong): The MSB is 1, so the number is negative and that bit is worth −128. Add the rest: −128 + 32 + 16 + 4 + 1 = −75. If you got 181, you read it as unsigned; if you got −53, you treated the MSB as just a minus sign.

**6 · Answer**
Write −100 as an 8-bit two's complement binary number.
Accept: 1001 1100 | 10011100
Feedback (correct): Right. −128 + 16 + 8 + 4 = −100.
Feedback (wrong): +100 = 0110 0100. Flip every bit: 1001 1011. Add 1: 1001 1100. Check: −128 + 16 + 8 + 4 = −100. If you got 1001 1011, you forgot to add 1; if you got 1110 0100, you only changed the sign bit.

**12 · Mission check**
A one-byte thermometer must store −20 °C. Where does the minus sign go?
- A. Into an extra ninth bit added in front of the byte — *A one-byte store has exactly 8 bits, so there is no ninth bit to use.*
- B. ✓ Into the most significant bit, which is 1 for a negative — *Right: the leftmost bit becomes the sign bit.*
- C. Into the least significant bit, which is 1 for a negative — *The LSB is the 1s column; it tells you odd or even, not the sign.*
- D. Stored first as a '−' character, then the number — *A character code needs a whole extra byte, and the computer cannot do arithmetic with it.*
Shown after answering: The most significant bit becomes the sign bit: 1 means negative. In two's complement, which most computers use, that bit is worth −128, so −20 = 1110 1100 (−128 + 108). The price is range: one signed byte holds −128 to +127 instead of 0 to 255.

### Mission 4: How does a computer store the letter A if it can only store numbers?  [module D4]

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

### Mission 5: Double a photo's width and height: how much bigger is the file?  [module D5]

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

**5 · Calculate**
bytes

An image is 200 x 100 pixels with a colour depth of 8 bits. What is its file size?
Answer: 20000  (accepted: [[20000.0, 20000.0]])
Feedback (correct): Right. 200 x 100 x 8 = 160,000 bits, and 160,000 ÷ 8 = 20,000 bytes.
Feedback (wrong): Multiply width x height x colour depth: 200 x 100 x 8 = 160,000 bits. Then divide by 8 for bytes: 160,000 ÷ 8 = 20,000 bytes.

**7 · Teach — Units of data**
> Diagram D4: A unit "staircase": bit → nibble → byte → kilo → mega → giga → tera, with the multiplier on each step. {A}: bit, byte (x 8), kB (x 1,000), MB, GB, TB (each x 1,000); no nibble. {O}: as A but with the symbol KB (not kB), plus nibble (4 bits) between bit and byte, and PB (x 1,000) at the top; small note "1,024 also accepted". {E I}: nibble, byte, KiB, MiB, GiB, TiB with x 1,024 per step ({I} adds a second, lighter staircase kB, MB, GB, TB with x 1,000). {C}: as E plus PiB, EiB. {Q}: names kilobyte (KB), megabyte (MB), gigabyte (GB), terabyte (TB), petabyte (PB), each x 1,024.
- A **bit** is a single 0 or 1. A **nibble** is 4 bits. A **byte** is 8 bits.
| Unit | Size |
|---|---|
| 1 kibibyte (KiB) | 1,024 bytes |
| 1 mebibyte (MiB) | 1,024 KiB |
| 1 gibibyte (GiB) | 1,024 MiB |
| 1 tebibyte (TiB) | 1,024 GiB |
- Each step up is x 1,024 (2¹⁰), so divide by 1,024 to go up one unit.
- 1 **pebibyte** (PiB) = 1,024 TiB and 1 **exbibyte** (EiB) = 1,024 PiB. Always use 1,024, and answer in the unit asked.

**9 · Calculate**
KiB

A photo file is 2,048,000 bytes. What is its size in kibibytes?
Answer: 2000  (accepted: [[2000.0, 2000.0]])
Feedback (correct): Right. 2,048,000 ÷ 1,024 = 2,000.
Feedback (wrong): Going up from bytes to the next unit, divide by 1,024: 2,048,000 ÷ 1,024 = 2,000. (2,048 is what you get if you wrongly divide by 1,000.)

**11 · Calculate**
photos

A camera saves every photo as exactly 4 MiB. How many photos fit on an empty 1 GiB memory card?
Answer: 256  (accepted: [[256.0, 256.0]])
Feedback (correct): Right. 1 GiB = 1,024 MiB, and 1,024 ÷ 4 = 256 photos.
Feedback (wrong): Put both sizes in the same unit first: 1 GiB = 1,024 MiB. Then 1,024 ÷ 4 = 256 photos.

**12 · Mission check**
Double a photo's width and height: how much bigger is the file?
- A. Twice as big, because the photo is now twice as wide. — *The height doubles as well, so the number of pixels goes up by more than 2 times.*
- B. Eight times as big, as the colour depth doubles as well. — *Resizing does not change the colour depth; each pixel still uses the same number of bits.*
- C. ✓ Four times as big, as there are four times as many pixels. — *Right. 2 x the width and 2 x the height gives 2 x 2 = 4 times as many pixels.*
- D. About the same size, because the colour depth is unchanged. — *The bits per pixel stay the same, but there are many more pixels to store.*
Shown after answering: File size = width x height x colour depth. Doubling the width and the height gives 2 x 2 = 4 times as many pixels, each with the same colour depth, so the file needs 4 times as many bits.

### Mission 6: How can a list of numbers turn into a song?  [module D6]

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
- **Sample resolution** (or bit depth): bits used to store each sample.
- Raise either one: the sound is closer to the original, but the file is bigger.

**3 · Quick check**
> Diagram D3: Optional: the same wave sampled at two rates labelled "22,050 Hz" and "44,100 Hz" (schematic, not to scale), with the second showing twice as many dots in the same time.
A recording app changes its sample rate from 22,050 Hz to 44,100 Hz. Nothing else changes. What happens?
- A. ✓ The sound is closer to the original and the file is larger. — *Right. More samples each second follow the wave more closely, and each extra sample needs storing.*
- B. Each sample can now store more possible amplitude values. — *That is what more bits per sample does; the sample rate only changes how often samples are taken.*
- C. The sound is closer to the original and the file is the same. — *Twice as many samples a second means twice as many to store, so the file doubles in size.*
- D. The recording plays back at twice its original speed. — *Playback uses the same sample rate it was recorded with, so the speed does not change.*

**4 · Teach — Working out sound file size**
- File size in bits = sample rate x sample resolution x length in seconds.
- Divide by 8 to get bytes.
- Example: 1 second at 44,100 Hz and 16 bits is 44,100 x 16 = 705,600 bits.
- Without a calculator, write the whole expression first, then cancel before you multiply.
- These questions assume one channel (mono) unless they say otherwise.

**5 · Calculate**
bytes

A voice memo is sampled at 8,000 Hz with a sample resolution of 8 bits. It lasts 10 seconds. What is its file size?
Answer: 80000  (accepted: [[80000.0, 80000.0]])
Feedback (correct): Right. 8,000 x 8 x 10 = 640,000 bits, and 640,000 ÷ 8 = 80,000 bytes.
Feedback (wrong): Multiply sample rate x bits per sample x seconds: 8,000 x 8 x 10 = 640,000 bits. Then divide by 8: 640,000 ÷ 8 = 80,000 bytes.

**6 · Calculate**
seconds

A sound file is 96,000 bytes. It was sampled at 8,000 Hz with 8 bits per sample. How long is the recording?
Answer: 12  (accepted: [[12.0, 12.0]])
Feedback (correct): Right. 96,000 bytes x 8 = 768,000 bits, and 768,000 ÷ (8,000 x 8) = 12 seconds.
Feedback (wrong): Turn the size into bits: 96,000 x 8 = 768,000 bits. Each second uses 8,000 x 8 = 64,000 bits, so 768,000 ÷ 64,000 = 12 seconds.

**8 · Calculate**
KiB

A clip is sampled at 32,000 Hz with a sample resolution of 16 bits. It lasts 64 seconds. What is its file size in kibibytes?
Answer: 4000  (accepted: [[4000.0, 4000.0]])
Feedback (correct): Right. 32,000 x 16 x 64 = 32,768,000 bits = 4,096,000 bytes, and 4,096,000 ÷ 1,024 = 4,000.
Feedback (wrong): Bits: 32,000 x 16 x 64 = 32,768,000. Bytes: ÷ 8 = 4,096,000. Then ÷ 1,024 = 4,000 KiB. (4,096 means you divided by 1,000.)

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

### Mission 7: How can a file shrink but still open exactly as before?  [module D7]

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

**4 · Teach — Run length encoding**
> Diagram D2: The AQA spec example: 16 bits 0000011100000011 in boxes, grouped by run (5 zeros, 3 ones, 6 zeros, 2 ones), with the pairs 5 0 · 3 1 · 6 0 · 2 1 beneath; count in orange, value in blue.
- **Run length encoding (RLE)** replaces each run of repeated data with a pair: how many times it repeats, then the value.
- Each pair is a count and a data value.
- Example: 0000011100000011 becomes 5 0 3 1 6 0 2 1.
- RLE is lossless. With little repetition it can make the data bigger, as every single value gains a count.

**5 · Answer**
Encode this row of a 1-bit image using RLE pairs (count, then value): 1111000000001100
Accept: 4 1 8 0 2 1 2 0 | 41802120 | 4,1,8,0,2,1,2,0 | 4, 1, 8, 0, 2, 1, 2, 0
Feedback (correct): Right. Four 1s, eight 0s, two 1s, two 0s: 4 1 8 0 2 1 2 0.
Feedback (wrong): Count each run from the left: 1111 (four 1s), 00000000 (eight 0s), 11 (two 1s), 00 (two 0s). Write count then value: 4 1 8 0 2 1 2 0.

**6 · Teach — Lossy and lossless**
> Diagram D3: Two panels from the same original picture of a flower. Lossless: smaller file icon, picture identical, label "rebuilt exactly". Lossy: much smaller file icon, picture slightly blocky (exaggerated), label "data removed for good". {I}: tags "JPEG" on the lossy panel.
- **Lossy** compression permanently removes data, usually detail people are unlikely to notice.
- Examples: reducing resolution or colour depth, or reducing sample rate or resolution.
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
- A signed integer uses the MSB for the sign: 0 positive, 1 negative.
- Two's complement: the MSB is worth −128; to negate, flip every bit and add 1. 8-bit range −128 to +127.
- A character set is an agreed list of characters with a binary code for each. Codes run in order, so B is one more than A.
- ASCII uses 7 bits: 128 characters, enough for English.
- Unicode uses more bits per character to cover far more characters, including other alphabets and emoji; its first 128 codes match ASCII.
- A bitmap is a grid of pixels; colour depth is the bits per pixel, and n bits give 2ⁿ colours.
- File size (bits) = width x height x colour depth; divide by 8 for bytes.
- Each unit up is x 1,024.
- A sample is the amplitude of the wave at one point in time, stored in binary.
- Sample rate = samples per second (Hz); sample resolution = bits per sample. Both raise quality and file size.
- File size (bits) = sample rate x bits per sample x seconds.
- Compression makes files smaller: less storage, faster transfer, less bandwidth.
- Lossless compression rebuilds the original exactly by storing repetition efficiently.
- RLE stores each run as a count and a value: 0000011100000011 → 5 0 3 1 6 0 2 1.
- Lossy compression permanently removes data for much smaller files.

---

## Data transmission  (Cambridge IGCSE Computer Science (0478/0984) · Topic 2)
Page: `computer-science-gcse-cambridge-igcse-data-transmission-mini-lesson.html`

### Mission 1: How does a video arrive in order if its pieces take different routes?  [module N4]

*Guess chips:* Each piece is numbered, then put back in order · Every piece is forced along the same route · The last router waits and sends them in order · I'm not sure yet

**1 · Teach — Splitting data into packets**
> Diagram D1: Screen 1: a long data bar (a photo strip) cut into four equal packets. Screen 2: one packet drawn as a long box divided into header (blue), payload (grey) and, for C, trailer (green). Header fields labelled: destination address, source address (C: originator's address), packet number. For Q, a "checksum" field.
- Before data is sent across a network, it is broken into small pieces called **packets**.
- Each packet is sent on its own and the receiving computer joins them back together.
- Small packets share the network's links fairly: no single huge file blocks a link. If one packet is lost or damaged, only that packet needs to be sent again.

**2 · Teach — Inside a packet**
> Diagram D1: Screen 1: a long data bar (a photo strip) cut into four equal packets. Screen 2: one packet drawn as a long box divided into header (blue), payload (grey) and, for C, trailer (green). Header fields labelled: destination address, source address (C: originator's address), packet number. For Q, a "checksum" field.
- The **header** holds the **destination address**, the **source address** (the **originator's address**) and the **packet number**, used to put the data back in order.
- The **payload** is the actual data being carried.
- The **trailer** marks the end of the packet and can hold data used to check for errors.

**3 · Quick check**
A web page is sent as 40 packets. Which part of each packet lets the receiving computer put the page back together in the right order?
- A. The destination address in the header — *This says which computer the packet is going to, not where it fits in the data.*
- B. The payload carried by the packet — *The payload is the data itself; on its own it doesn't say which piece comes first.*
- C. ✓ The packet number in the header — *Right. Each packet is numbered, so the receiver can sort them back into order.*
- D. The source address in the header — *Every packet from the same sender has the same source address, so it can't show the order.*

**4 · Teach — Packet switching**
> Diagram D2: A map of 6 routers between Sender and Receiver. Packets 1–4 take different coloured paths; they arrive in the order 2, 1, 4, 3 and are then shown sorted 1, 2, 3, 4 at the receiver.
- In **packet switching**, each packet is sent across the network separately.
- **Routers** read each packet's destination address and send it on towards its destination, one hop at a time.
- Each packet may take a **different route**, depending on which links are free or working.
- So packets can **arrive out of order**. Once the last packet arrives, the receiver uses the packet numbers to **reorder** them.

**5 · Answer**
Four packets arrive in this order. Packet 3: "E GA" · Packet 1: "MEET" · Packet 4: "TE" · Packet 2: " AT TH". Type the original message.
Accept: MEET AT THE GATE | MEETATTHEGATE
Feedback (correct): Right. Sorting by packet number gives 1, 2, 3, 4: "MEET" + " AT TH" + "E GA" + "TE" = MEET AT THE GATE.
Feedback (wrong): Ignore the arrival order and sort by packet number: 1 "MEET", 2 " AT TH", 3 "E GA", 4 "TE". Joined, that reads MEET AT THE GATE.

**6 · Quick check**
A cable between two routers is cut while a file is being sent. What happens to the packets still to be sent?
- A. They are lost, and the whole file must be sent again from the start. — *Packets don't need a fixed path, so only packets lost on the cut link need resending.*
- B. They wait at the last router until that same cable is repaired. — *Routers don't wait for one path; each packet can be sent another way.*
- C. They are merged into one large packet to get through faster. — *Packets aren't merged; they keep their own headers and travel separately.*
- D. ✓ Routers send them along other routes to the destination. — *Right. Each packet is routed on its own, so routers can avoid the broken link.*

**9 · Mission check**
How does a video arrive in order if its pieces take different routes?
- A. Routers make every packet follow the same route so none overtake. — *In packet switching each packet can take its own route, so they often overtake.*
- B. ✓ Each packet is numbered, and the receiver reorders them at the end. — *Right. The packet number in each header lets the receiver rebuild the data in order.*
- C. The last router holds all the packets and sends them on in order. — *Routers just forward packets; the receiving computer puts them back in order.*
- D. The packets are sent one at a time, each only after the last arrives. — *Packets are sent without waiting, so they can arrive out of order.*
Shown after answering: The video is split into packets, and each header includes a packet number. Routers send each packet on whatever route works best, so they can arrive jumbled. When the last packet arrives, the receiving computer uses the numbers to put them back in order.

### Mission 2: Parallel sends 8 bits at once. So why is USB serial?  [module N6]

*Guess chips:* Bits on parallel wires drift out of step · Serial is always the faster method · Parallel can only send one way · I'm not sure yet

**1 · Teach — One wire or many?**
> Diagram D1: Top: Sender and Receiver joined by one wire; the byte 01001011 travels as a queue of bits (blue squares) in single file. Bottom: same Sender and Receiver joined by 8 wires; the same 8 bits side by side, one per wire, level with each other. Labels "Serial: 1 wire" and "Parallel: 8 wires".
- **Serial** transmission sends data **one bit at a time** down a **single wire**.
- **Parallel** transmission sends **several bits at the same time** down **several wires**, e.g. 8 bits on 8 wires.
- Over the same short distance, parallel can move more data per second.
- Parallel is used over **short distances**, e.g. inside a computer or within an integrated circuit.

**2 · Teach — Why distance changes things**
> Diagram D2: The parallel row from D1 but over a long cable: the 8 bits start aligned at the sender and arrive staggered at the receiver (some ahead, some behind), with an orange bracket labelled "skew". A small inset of two neighbouring wires with a zig-zag labelled "interference".
- Over a long parallel cable, bits sent together arrive at slightly different times. This is **skew**, and the data can be corrupted.
- Wires lying side by side can also cause **interference** with each other.
- Serial has no skew, so it is **more reliable over long distances**.
- Serial cables need fewer wires, so they are **cheaper**. Serial is slower than parallel over a short distance.

**3 · Quick check**
A school wants to link a computer to a printer 20 m away down a corridor. Which method is most suitable?
- A. Parallel, because it always sends data faster than serial — *It is only faster over short distances; at 20 m skew would corrupt the data.*
- B. ✓ Serial, because one wire stops bits drifting out of step — *Right. One wire means no skew, and the cable is cheaper too.*
- C. Parallel, because more wires means less chance of errors — *More wires adds skew and interference between wires, so more errors.*
- D. Serial, because it can send several bits at the same time — *That describes parallel; serial sends one bit at a time.*

**4 · Teach — Which way can data go?**
> Diagram D3: Three rows, each two boxes A and B: simplex with a single arrow A→B; half-duplex with arrows both ways, one solid and one faded, label "one way at a time"; full-duplex with two solid arrows both ways, label "both at once".
- **Simplex**: data travels in **one direction only**, e.g. a computer sending data to a monitor.
- **Half-duplex**: both directions, but **only one direction at a time**, e.g. a walkie-talkie.
- **Full-duplex**: both directions **at the same time**, e.g. a phone call.
- Each one combines with serial or parallel, e.g. "serial half-duplex".

**5 · Quick check**
A weather sensor sends readings to a computer. The computer never sends anything back. Which method is this?
- A. Half-duplex, because the data only goes one way at a time — *Half-duplex allows both directions in turn; here data never comes back.*
- B. Full-duplex, because the sensor sends data all the time — *Full-duplex needs both directions at once; sending often is not two-way.*
- C. ✓ Simplex, because data only travels in one direction — *Right. One direction only is simplex.*
- D. Serial, because the sensor is a long way from the computer — *Serial says how the bits travel, not which directions are allowed.*

**6 · Teach — The universal serial bus**
> Diagram D4: A USB cable and plug linking a laptop and a printer, with three callouts: "serial", "auto-detects device and loads driver", "can supply power". A ruler under the cable marked "max 5 m (USB 2.0)".
- **USB** is an industry-standard interface that sends data by **serial** transmission.
- Benefits: devices are **detected automatically** and the right **driver** is loaded; one standard fits many devices; it can **power or charge** a device; newer versions are **backward compatible**.
- Drawbacks: **maximum cable length** is limited (5 m for USB 2.0) [S2]; older versions may stop being supported.

**7 · Quick check**
Which of these is a **drawback** of USB?
- A. ✓ A standard cable can only be a few metres long — *Right. A USB 2.0 cable is limited to 5 m.*
- B. A driver must be installed by hand for each new device — *USB detects a device and loads its driver automatically; that is a benefit.*
- C. Its bits arrive out of step because it is parallel — *USB is serial, so skew is not a problem for it.*
- D. It can only send data in one direction, from the device — *USB carries data both ways, e.g. to a printer and back.*

**8 · Mission check**
Parallel sends 8 bits at once. So why is USB serial?
- A. Serial always sends more bits per second than parallel — *Over short distances parallel is faster; speed alone is not the reason.*
- B. Parallel cables can only carry data in one direction — *Direction is simplex or duplex; parallel can be either.*
- C. ✓ Serial bits can't drift out of step and need fewer wires — *Right. No skew means reliable data over a cable, and fewer wires cost less.*
- D. USB devices only ever need to send one bit at a time — *Devices send lots of data; serial just sends it one bit after another.*
Shown after answering: On a long parallel cable, bits sent together arrive at slightly different times (skew) and wires interfere with each other. Serial sends one bit after another down one wire, so it stays reliable over distance and needs a cheaper cable. That is why USB, used with cables, is serial.

### Mission 3: One bit flips on the way. How can the receiver even tell?  [module N7]

*Guess chips:* An extra bit counts the 1s · It compares with the sender's copy · It can't, until the file breaks · I'm not sure yet

**1 · Teach — When bits go wrong**
> Diagram D1: Three 8-bit boxes. Row 1: data bits 1010110 with an empty leftmost parity box. Row 2 "even parity": 0 1010110 (parity bit 0 in orange; label "four 1s, already even"). Row 3 "odd parity": 1 1010110 (parity bit 1 in orange; "five 1s"). Optional strip: the even byte 01010110 crossing a cable, a lightning mark, arriving as 01110110 with the changed bit (3rd from left) in red and "five 1s: error".
- **Interference** during transmission can cause **data loss**, **data gain** or **data change**.
- The receiver never sees the original, so the sender adds extra check data.
- **Parity check**: one bit of each byte is a **parity bit**. **Even parity**: each byte holds an even number of 1s. **Odd parity**: an odd number.
- The receiver counts the 1s. A wrong count means an error, so the data is resent.

**2 · Answer**
A system uses **even** parity. The parity bit is the leftmost bit. The 7 data bits are 1101011. Write the whole byte that is sent.
Accept: 11101011 | 1110 1011
Feedback (correct): Yes. The data has five 1s, so the parity bit is 1 to make six, an even number.
Feedback (wrong): Count the 1s in 1101011: there are 5. Even parity needs an even total, so the parity bit is 1. The byte is 11101011.

**3 · Teach — Finding the faulty bit**
> Diagram D2: A 4-row × 8-column grid of a correct block (even parity): rows 01001101, 10110010, 01110001, 10101100, then a shaded parity byte row 00100010. Column 1 header "parity bit", columns 2–8 "data". Arrows show one row check (count across) and one column check (count down).
- One parity bit misses errors where **two bits** change: the count stays even (or odd).
- A **parity block check** sends several bytes, each with a parity bit, plus a **parity byte**: the parity bit for each column.
- The receiver checks every row and column. The faulty bit is where the failing row meets the failing column, so it can be corrected.

**4 · Quick check**
> Diagram D3: The received block: rows 01001101, 10110010, 01111001, 10101100, parity byte 00100010. Rows labelled Byte 1–4 and "Parity byte"; columns labelled 1–8 (1 = parity bit).
This block was sent with even parity on every row and column (column 1 is the parity bit, the last row is the parity byte).  Which bit is wrong?
- A. Byte 3, column 1 — *Byte 3's row fails, but column 1 still adds up to an even number; the parity bit is fine.*
- B. Can't tell: parity can detect an error but never locate it — *A single parity bit can't, but with a parity byte the failing row and column pin it down.*
- C. ✓ Byte 3, column 5 — *Right. Row 3 has five 1s and column 5 has three 1s; they cross at that bit.*
- D. The parity byte, column 5 — *The parity byte's own row has an even number of 1s, so the error is in a data byte.*

**5 · Teach — Checksum and echo check**
- **Checksum**: the sender calculates a value from a block of data with an agreed algorithm and sends it too.
- The receiver recalculates it from the data received. Different values mean an error, so the data is resent.
- **Echo check**: the receiver sends the data back; the sender compares it with the original and resends if different.
- Drawback: an echo error may have happened on the way back.

**6 · Teach — Automatic repeat query**
> Diagram D4: ARQ timeline, sender left, receiver right, time downwards. Packet 1 → arrives OK → "positive acknowledgement" back. Packet 2 → arrives with error (red) → "negative acknowledgement" → packet 2 resent → OK → positive ack. Packet 3 → lost (cross mid-way); a clock icon on the sender side labelled "timeout" → packet 3 resent → positive ack.
- **ARQ** (automatic repeat query) uses **acknowledgements** and a **timeout**.
- The receiver checks the data, e.g. with a checksum. No error: it sends a **positive acknowledgement**. Error: it sends a **negative acknowledgement** and the sender resends.
- **Timeout**: if no acknowledgement arrives within a set time, the sender resends automatically.
- This repeats until the data arrives correctly, or a set number of attempts is reached.

**7 · Teach — Check digits**
> Diagram D5: Worked ISBN-13 for 978-0-306-40615-?: table of 12 digits, weights 1 3 1 3…, products 9 21 8 0 3 0 6 12 0 18 1 15, total 93, remainder 3, 10 − 3 = 7. Final ISBN 978-0-306-40615-7.
- A **check digit** is a final digit calculated from the other digits. It catches **data entry** errors.
- Used in **ISBNs** (book numbers) and **barcodes**.
- On entry the check digit is recalculated and compared. A mismatch shows a mistake, e.g. a wrong or swapped digit.
- In an exam, the question tells you which check-digit method to use (ISBN-13 is one example).
- ISBN-13: multiply the 12 digits alternately by 1 and 3, add, take the remainder ÷ 10, and subtract it from 10 (10 gives 0).

**8 · Calculate**
Find the ISBN-13 check digit for 978-1-84356-028-?
Answer: 9  (accepted: [[9.0, 9.0]])
Feedback (correct): Yes. The weighted total is 111, the remainder is 1, and 10 − 1 = 9.
Feedback (wrong): Digits × 1, 3, 1, 3…: 9 + 21 + 8 + 3 + 8 + 12 + 3 + 15 + 6 + 0 + 2 + 24 = 111. 111 ÷ 10 leaves remainder 1. 10 − 1 = 9.

**9 · Mission check**
One bit flips on the way. How can the receiver even tell?
- A. ✓ Extra check data is sent and recalculated by the receiver — *Right. A parity bit or checksum that no longer matches reveals the error.*
- B. The receiver compares the data with the sender's original copy — *The receiver never has the original; that is why check data is added.*
- C. A flipped bit makes the data longer, so the size gives it away — *A data change keeps the same number of bits, so the size looks normal.*
- D. It can't: errors only show up when the file refuses to open — *Parity, checksums and echo checks catch errors as soon as data arrives.*
Shown after answering: The sender adds check data worked out from the bits, such as a parity bit or a checksum. The receiver works it out again from what arrived; if it doesn't match, there is an error, and ARQ gets the data sent again.

### Mission 4: How can you lock a message for someone you have never met?  [module N8]

*Guess chips:* They send you an open padlock first · Post the key in a separate message · Use a very long password · I'm not sure yet

**1 · Teach — Why encrypt?**
> Diagram D1: Left to right: "Plaintext: Meet at 3pm" → box "encrypt" with a key icon → "Ciphertext: x9#Lq!7vRz" travelling along a cable → box "decrypt" with a key icon → "Plaintext: Meet at 3pm". An eavesdropper above the cable holds a copy of the ciphertext with a "?" bubble.
- Data sent over a network can be **intercepted** by anyone tapping into the connection.
- **Encryption** uses an algorithm and a **key** to turn **plaintext** into **ciphertext**.
- Encryption does **not** stop interception. It makes intercepted data meaningless to anyone without the right key.
- **Decryption** uses a key to turn the ciphertext back into plaintext.

**2 · Quick check**
An attacker intercepts an encrypted file on its way across the internet. What has encryption achieved?
- A. The file could not be intercepted in the first place — *Encryption doesn't block interception; the attacker did capture the file.*
- B. The file deletes itself as soon as it is intercepted — *Ciphertext is just data; nothing in it can detect being copied.*
- C. ✓ The attacker can't understand the file without the key — *Right. They hold only ciphertext, which is meaningless without the key.*
- D. The sender and receiver are hidden from the attacker — *Encryption scrambles the content; addresses still have to be readable to deliver it.*

**3 · Teach — Symmetric encryption**
> Diagram D2: Symmetric: Ana and Ben each hold an identical key (both gold). Message arrow Ana → Ben carries ciphertext. A dashed arrow labelled "key must be shared first" goes Ana → Ben, with the eavesdropper grabbing a copy of the key (red warning).
- **Symmetric encryption** uses the **same key** to encrypt and to decrypt.
- So the sender must get a copy of the key to the receiver before any message can be read.
- If the key is intercepted while it is being shared, the attacker can decrypt every message sent with it.
- Sharing the key safely is the big weakness of symmetric encryption.

**4 · Teach — Asymmetric encryption**
> Diagram D3: Asymmetric: Ben holds a key pair joined by a link: public key (green) and private key (purple, inside a locked drawer at Ben's side). A copy of the green public key goes to Ana (and to a crowd of others). Ana encrypts with the green key; ciphertext travels to Ben; Ben decrypts with the purple key.
- **Asymmetric encryption** uses two different keys: a matching **public key** and **private key**.
- The **public key** can be given to anyone. It is used to **encrypt** messages for its owner.
- The **private key** is kept secret by its owner and never sent. Only it can **decrypt** what the matching public key encrypted.
- So no secret key ever has to travel across the network.

**5 · Quick check**
Ana wants to send Ben a message that only Ben can read, using asymmetric encryption. Which key should Ana encrypt it with?
- A. Ana's own private key — *Anyone with Ana's public key could then decrypt it, so it would not be secret.*
- B. Ben's private key — *Ben never shares his private key, so Ana can't have it.*
- C. Ana's own public key — *Only Ana's private key could decrypt that, so Ben couldn't read it.*
- D. ✓ Ben's public key — *Right. Only Ben's matching private key can decrypt the message.*

**6 · Quick check**
An attacker copies Ben's public key as it is sent to Ana. What can the attacker now do?
- A. ✓ Encrypt messages to Ben, but not read Ana's to him — *Right. Reading them needs Ben's private key, which never left Ben.*
- B. Decrypt every message Ana encrypts with Ben's public key — *A public key only encrypts; decrypting needs the matching private key.*
- C. Work out Ben's private key by reversing the public key — *The keys are a matching pair, but the private key can't practically be worked out from the public one.*
- D. Read the messages, because both ends use the same key — *That is symmetric encryption; asymmetric uses two different keys.*

**7 · Mission check**
How can you lock a message for someone you have never met?
- A. Send them the shared secret key in a separate message first — *That key could be intercepted too, and then every message can be read.*
- B. ✓ Use their public key; only their private key unlocks it — *Right. No secret key ever has to travel, so interception doesn't help.*
- C. Encrypt it with your own private key so only you can open it — *Anyone with your public key could decrypt it, and the receiver can't use your private key.*
- D. Use a very long key so that nobody could ever guess it — *A long key still has to be shared, and a copied key works however long it is.*
Shown after answering: Asymmetric encryption: the receiver publishes a public key that anyone can use to encrypt messages to them. Only the receiver's private key, which never leaves them, can decrypt those messages, so nothing secret is sent.

### Recap

- Data is split into packets; each has a header (destination address, source address, packet number) and a payload.
- In packet switching, routers send each packet separately, so packets may take different routes and arrive out of order; the receiver reorders them using the packet numbers.
- A packet also has a trailer that marks its end.
- Serial: one bit at a time, one wire; reliable over distance, cheaper. Parallel: several bits at once; fast but only over short distances because of skew.
- Simplex is one way, half-duplex is both ways in turn, full-duplex is both ways at once.
- USB is serial: automatic detection and drivers, power supply, one standard; limited cable length.
- Interference causes data loss, gain or change; parity checks, checksums and echo checks detect it after transmission.
- A parity block (with a parity byte) can locate the exact faulty bit; ARQ uses acknowledgements and a timeout to get data resent.
- A check digit, recalculated on entry, catches data-entry errors in ISBNs and barcodes.
- Encryption doesn't stop interception; it makes intercepted data unreadable without the key.
- Symmetric: one shared key, which must be passed on safely. Asymmetric: encrypt with the receiver's public key, decrypt with their private key.

---

## Hardware  (Cambridge IGCSE Computer Science (0478/0984) · Topic 3 (3.1, 3.3, 3.4))
Page: `computer-science-gcse-cambridge-igcse-hardware-mini-lesson.html`

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
- The **current instruction register (CIR)** holds the instruction being decoded and executed.
- An address says *where* something is; data is *what* is stored there.
- A **microprocessor** is a CPU on a single integrated circuit (chip).

**4 · Teach — Buses**
> Diagram D2: CPU block diagram. Variant A E I (screen 2): CPU box containing CU, ALU, a row of 3 unlabelled "register" boxes, clock symbol; main memory box outside the CPU. For A: one thick double-headed line labelled "bus". For E I (screen 4): three lines between CPU and memory: address bus (single arrow CPU→memory, orange), data bus (double arrow, blue), control bus (double arrow, grey). Variant O C Q (screen 3): CPU box with CU, ALU, and labelled registers PC, MAR, MDR, ACC; CIR shown for C and Q only; cache box inside CPU for O and Q only. For C: same three coloured buses as E I.
- A **bus** is a set of parallel wires carrying signals between the CPU, main memory and other components.
- The **address bus** carries memory addresses from the CPU to memory. It only goes one way.
- The **data bus** carries data and instructions between the CPU and memory, in both directions.
- The **control bus** carries control signals, such as "read" or "write" and clock pulses, to coordinate components.

**5 · Teach — The cycle that never stops**
> Diagram D3: FDE cycle as a loop of three arrows: Fetch → Decode → Execute → back to Fetch, with the clock drawn beside it ("each step timed by clock pulses"). Board labels: A title "Fetch-Execute cycle", O "fetch-execute cycle", E C Q I "fetch–decode–execute cycle". Optional animated variant for O C Q: PC=4 → MAR=4 → memory location 4 → MDR (→ CIR for C Q) → PC=5. For C, E, I show the address travelling on the address bus and the instruction returning on the data bus.
- Kept in step by the clock, the CPU repeats the **fetch–decode–execute (FDE) cycle** billions of times a second.
| Stage | What happens |
|---|---|
| **Fetch** | The address in the PC is copied to the MAR and sent along the address bus to RAM. The CU sends a read signal on the control bus. The instruction returns on the data bus to the MDR and is copied to the CIR. The PC goes up by 1 |
| **Decode** | The CU decodes the instruction in the CIR |
| **Execute** | The instruction is carried out: the ALU may do a calculation, with the result stored in the ACC, or data may be read from or written to RAM using the MAR and MDR |
- The **instruction set** is the list of all the machine code commands a CPU can process.

**6 · Quick check**
An instruction says "add the number stored at address 12 to the total". In which stage is the number at address 12 read from memory?
- A. Fetch, because the CPU fetches everything it needs then — *Fetch only brings in the instruction itself; the number it refers to is not known until it is decoded.*
- B. Decode, because the CU reads values while decoding — *Decoding works out what the instruction means; it does not read the data the instruction uses.*
- C. ✓ Execute, when the instruction is carried out — *Right: the execute stage can include reading from or writing to main memory.*
- D. Between cycles, while the clock waits for the next pulse — *There is no gap for this; every memory access happens within a stage of the cycle.*

**7 · Answer**
At the start of the fetch stage, the address in the program counter is copied into which register?
Accept: MAR | memory address register | the MAR
Feedback (correct): Yes. The MAR holds the address of the memory location to be read, here the next instruction.
Feedback (wrong): It is the MAR (memory address register). The PC holds the address of the next instruction; it is copied to the MAR so that memory location can be read. The MDR then receives the instruction itself.

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

### Mission 3: Pull the plug and unsaved work is gone. So how does it boot?  [module H3]

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

### Mission 4: One storage firm runs 300,000+ spinning hard disks. Why not SSDs?  [module H4]

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
- Flash uses **NAND** or **NOR** technology. Transistors act as **control gates** and **floating gates**; trapped electrons store the bits.
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

**6 · Teach — Cloud storage**
> Diagram D4: A phone, a laptop and a tablet each linked by the internet (cloud outline) to a data centre drawn as server racks containing hard disk and SSD icons.
- **Cloud storage** keeps your files on servers at a remote location, reached over the internet. The servers use magnetic and/or solid-state storage.
- Advantages: access from any device, anywhere; easy sharing; the provider handles backups and maintenance; buy more space when needed.
- Disadvantages: no internet, no access; slow connections mean slow transfers; ongoing fees; you rely on the provider to keep data secure and private.

**7 · Quick check**
A school is choosing between cloud storage and its own local file server. Which is a disadvantage of the cloud?
- A. Files stored there cannot be shared with other users — *Sharing is one of the cloud's main advantages: a link can give others access.*
- B. ✓ Files cannot be reached if the internet goes down — *Right: cloud files are on remote servers, so no connection means no access.*
- C. The school must buy and repair the servers — *That is true of a local server; with the cloud, the provider owns and maintains the hardware.*
- D. Data in the cloud is never backed up anywhere — *Providers usually keep backup copies; the risk is relying on them, not a lack of backups.*

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

### Mission 5: How does your data find one computer among billions online?  [module H7]

*Guess chips:* Routers follow its address, hop by hop · It is sent to every computer, and the right one keeps it · It looks up the computer's name, like "Sam-Laptop" · I'm not sure yet

**1 · Teach — IP addresses**
> Diagram D1: A laptop with two labels: "IP address 192.168.0.12" (all boards on screen 1) and, on screen 7 only for O C, "MAC address 00:1A:2B:3C:4D:5E" on its NIC. For C, bracket the MAC: "00:1A:2B" = manufacturer code, "3C:4D:5E" = serial code.
- An **IP address** identifies a device on a network, so data can be sent to it. Every packet carries a **destination IP address**.
- An **IPv4** address is 32 bits, written as four denary numbers from 0 to 255 separated by dots, e.g. 192.168.0.12. Each number is one byte (8 bits).
- The network allocates IP addresses. A **static** one never changes; a **dynamic** one may change at each connection.

**2 · Quick check**
Which of these is a valid IPv4 address?
- A. 256.10.3.1 — *Each number is one byte, so it can only go up to 255; 256 is too big.*
- B. ✓ 172.16.254.1 — *Right. Four numbers, each from 0 to 255, separated by dots.*
- C. 192.168.1 — *An IPv4 address needs four numbers (32 bits); this has only three.*
- D. 10.4.27.8.1 — *An IPv4 address has exactly four numbers; this has five.*

**3 · Teach — Routers**
> Diagram D2: Home LAN (laptop, phone) → home router → three internet routers → a server's LAN. A packet with header "to: 203.0.113.5" moves along the hops.
- A **router** connects networks together, for example a home or school LAN to the internet.
- The internet is a vast number of networks joined by routers.
- A router reads each packet's **destination IP address** and sends it to the next router on a route towards it. Hop by hop, the packet reaches the right network.
- A router can also assign IP addresses to devices on its network.

**4 · Quick check**
A packet arrives at a router in the middle of the internet. What does the router use to decide where to send it next?
- A. The source IP address in its header — *The source address says where the packet came from, not where it is going.*
- B. The name of the computer it is for — *Routers work with IP addresses, not computer names like "Sam-Laptop".*
- C. The packet number in its header — *The packet number is for putting data back in order; it says nothing about the destination.*
- D. ✓ The packet's destination IP address — *Right. The router forwards the packet towards the network with that address.*

**5 · Answer**
A computer stores an IPv4 address in binary: 11000000.10101000.00000001.00001010. Write it in the usual dotted denary form.
Accept: 192.168.1.10
Feedback (correct): Right. 11000000 = 192, 10101000 = 168, 00000001 = 1, 00001010 = 10.
Feedback (wrong): Convert each byte separately. 11000000 = 128 + 64 = 192; 10101000 = 128 + 32 + 8 = 168; 00000001 = 1; 00001010 = 8 + 2 = 10. So the address is 192.168.1.10.

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
- The first half is the **manufacturer code**; the second half is the **serial code**.
- MAC addresses identify devices **within a LAN**. A MAC address stays the same; an IP address can change.

**8 · Quick check**
A technician sees the address 3C:52:82:1F:A0:6B on a laptop. What kind of address is it?
- A. An IPv6 address, because it uses hexadecimal digits — *IPv6 does use hex, but it has eight groups of four digits; this has six pairs.*
- B. An IPv4 address, because it has groups separated by marks — *IPv4 uses four denary numbers (0–255) separated by dots, not hex pairs.*
- C. ✓ A MAC address, because it has six pairs of hex digits — *Right. Twelve hex digits in six pairs make the 48-bit MAC address of the laptop's NIC.*
- D. A web address (URL) that leads to the laptop — *A URL is text such as www.example.com; this hex-pair format is fixed in the NIC when it is made.*

**11 · Mission check**
How does your data find one computer among billions online?
- A. It is sent to every computer, and only the right one keeps it. — *Sending to everyone would flood the internet; routers send each packet towards one address.*
- B. It follows one fixed cable laid between the two computers. — *There's no single cable: packets cross many networks, hop by hop, through routers.*
- C. It searches for the computer's name, such as "Sam-Laptop". — *Data is delivered by IP address, not by a computer's name.*
- D. ✓ Routers read its destination IP address and pass it on. — *Right. Each router sends the packet one step closer to the network with that address.*
Shown after answering: Every device online has an IP address, and every packet carries its destination IP address. The internet is many networks joined by routers; each router reads that address and forwards the packet one hop closer, until it reaches the right network and the right device.

### Recap

- Instructions and data are both stored in main memory; the CPU fetches, decodes and executes them, one after another, kept in step by the clock.
- Registers do specific jobs: the PC and MAR hold addresses; the MDR, CIR and ACC hold data or instructions.
- The address bus carries addresses, the data bus carries data and instructions, the control bus carries control signals.
- An embedded system is a computer inside a larger device that does one dedicated job.
- Higher clock speed means more cycles, and so more instructions, every second.
- More cores help only when the work can be split; a larger cache means fewer slow trips to RAM.
- RAM is volatile and holds what is in use now; ROM is non-volatile and holds the start-up instructions.
- When RAM is full, virtual memory on secondary storage takes the overflow, but swapping is slow.
- Secondary storage is non-volatile and keeps data for the long term; choose it by capacity, speed, portability, durability, reliability and cost.
- Magnetic: huge and cheap per gigabyte, but moving parts. Solid state: fast and robust, but dearer per gigabyte.
- Optical discs are read by a laser (pits and lands): cheap but low capacity.
- Cloud storage is on remote servers: access anywhere, but only with an internet connection.
- An IP address identifies a device on a network. Routers read each packet's destination IP address and forward it hop by hop.
- IPv4 is 32 bits (four numbers, 0–255); IPv6 is 128 bits in hex, giving far more addresses.
- A MAC address is a 48-bit hex address fixed in a NIC when it is made, used to find devices within a LAN.

---

## Input and output devices and sensors  (Cambridge IGCSE Computer Science (0478/0984) · Topic 3 (3.2))
Page: `computer-science-gcse-cambridge-igcse-input-output-devices-sensors-mini-lesson.html` (NEW)

### Mission 1: Your phone screen feels your finger but not your glove. Why?  [module H6a]

*Guess chips:* It senses the heat of your skin · Your finger conducts electricity · Gloves don't press hard enough · I'm not sure yet

**1 · Teach — Input devices**
- An **input device** lets data be entered into a computer so that it can be processed. Without input, the computer has nothing to work on.
- Each one turns something in the real world (a key press, a sound, a movement) into **data**.
| Device | How it works |
|---|---|
| **Keyboard** | Keys sit over a grid of row and column wires. Pressing a key connects one row to one column. The keyboard scans the grid to find which key it is and sends that key's character code to the computer [S4] |
| **Microphone** | Sound waves make a thin **diaphragm** vibrate. Its movement produces a varying electrical signal [S5], which is converted to digital so the computer can store and process it |
| **Optical mouse** | An **LED** lights the surface below. A small image sensor takes over 1,000 images a second. A processor compares each image with the last to work out the direction and distance moved, and sends this to the computer to move the pointer [S6] |

**2 · Teach — Cameras and scanners**
- All three use a **sensor** made of light-sensitive cells, then convert the readings to digital data.
| Device | How it works |
|---|---|
| **Digital camera** | A lens focuses light onto an image sensor with millions of light-sensitive cells. Each cell turns light into an electric charge; red, green and blue filters record colour. The readings are converted to digital and stored as the **pixels** of an image [S7] |
| **2D scanner** | A document lies on a glass plate and is lit by a bright light as the scan head moves along it. Reflected light is directed by mirrors and a lens onto a sensor, which turns it into an electrical signal; this is converted to digital to make an image [S8] |
| **3D scanner** | Lasers or patterns of light are shone onto a solid object, and a camera sensor records the reflected light. The scanner calculates the distance to millions of points on the surface, giving their coordinates. The object (or scanner) is moved so every side is captured, and the points are joined into a **3D model** [S9] |

**3 · Teach — Barcode and QR code scanners**
> Diagram D1: Barcode scanner close-up: a red light beam sweeping across 6 bars of different widths; above each white space an arrow reflecting back to a sensor labelled "sensor", above each black bar a short arrow ending at the bar labelled "absorbed". Output box "decoded number", then a small database table icon labelled "price looked up".
| Device | How it works |
|---|---|
| **Barcode scanner** | Shines light (from an LED or laser) onto the barcode. White spaces reflect much more light than black bars, which absorb most of it [S10]. A sensor turns the reflected light into an electrical signal, and the pattern of bar widths is decoded into a number |
| **QR code scanner** | A camera captures a 2D grid of black and white squares, and software decodes the pattern. Three large squares in the corners let it be read at any angle [S11]. It can hold far more data than a barcode, such as a web address |
- A barcode's number identifies the product. The price is looked up in a database; it is not stored in the bars.

**4 · Quick check**
A shop's barcode scanner is pointed at the barcode on a tin of beans. What is the scanner actually detecting?
- A. The price of the tin, stored in the widths of the bars — *The bars store a product number; the price is looked up in the shop's database using that number.*
- B. The magnetism of the special ink in the black bars — *Barcodes are read with light, not magnetism; ordinary ink works.*
- C. Light given out by the white spaces between the bars — *The spaces give out no light of their own; they reflect the scanner's light.*
- D. ✓ Differences in how much light the bars and spaces reflect — *Right: white spaces reflect most of the light and black bars absorb it, and the pattern is decoded.*

**5 · Teach — Resistive and capacitive touch screens**
> Diagram D2: Two side-view cross-sections. Resistive: flexible top sheet, small spacer dots, rigid glass bottom layer, conducting coatings shaded on the inner faces; a gloved fingertip pressing the layers together at one point (contact marked with a green dot, label "circuit completed"). Capacitive: glass with a thin conducting layer, faint field lines above it; a bare fingertip with small arrows showing charge drawn into the finger, label "current drawn"; beside it a gloved fingertip with no arrows, label "insulator: no change".
- There is more than one kind of touch screen. They detect a touch in different ways.
| Type | How it detects a touch |
|---|---|
| **Resistive** | A flexible top sheet sits over a rigid glass layer. Each has a conducting coating on the inside, kept apart by tiny insulating spacer dots. **Pressing** pushes the two layers together at one point, completing a circuit. The voltage measured there gives the position [S12] |
| **Capacitive** | Glass is coated with a transparent conducting layer that holds an even **electric field** (charge). A bare finger **conducts**, so it draws a small current from the screen where it touches. The controller measures the change to calculate the position [S13] |

**6 · Teach — Infra-red touch screens and comparing them**
> Diagram D3: Top view of an infra-red touch screen frame: LEDs along the left and bottom edges, sensors along the right and top edges, a grid of dashed red lines labelled "infra-red beams (invisible)". A gloved fingertip blocks one horizontal and one vertical beam; those two beams are drawn broken after the finger, and their sensors are greyed out; label "x" and "y" on the two blocked beams.
- **Infra-red:** LEDs along two edges send a grid of invisible infra-red beams across the screen to sensors on the opposite edges. A touch **blocks** one or more beams; the blocked horizontal and vertical beams give the position [S14].
|  | Resistive | Capacitive | Infra-red |
|---|---|---|---|
| Works with a glove or plastic stylus? | Yes, any pressure | No, needs a conductor such as skin | Yes, any object that blocks the beams |
| Several touches at once? | Usually one touch only | Yes (multi-touch) | Yes |
| Other points | Cheap [S15]; plastic top sheet scratches more easily and makes the image less clear | Glass surface: clear, bright and hard-wearing | Glass surface; very bright light can affect the sensors |

**7 · Quick check**
Factory workers wearing thick gloves need a touch screen. Which choice is best, and why?
- A. Capacitive, as its sharp, bright display is easy to read — *Gloves are insulators, so a capacitive screen will not detect the touch at all.*
- B. Infra-red, as it detects the warmth of the worker's hand — *An infra-red screen would work, but because a gloved finger breaks its beams, not by sensing warmth; a thick glove blocks heat anyway.*
- C. ✓ Resistive, as it responds to pressure from any object — *Right: pressing with a glove still pushes the two layers together.*
- D. Capacitive, as a glove still carries charge from the hand — *A thick glove insulates the hand, so no charge is drawn from the screen.*

**8 · Quick check**
A museum wants a large wall touch screen. Several children must be able to use it at once, some with plastic pen-shaped pointers. Which type is most suitable?
- A. ✓ Infra-red, as any object breaks the beams, many at a time — *Right: pointers and fingers both block beams, and several touches can be found at once.*
- B. Capacitive, as it can detect several touches at the same time — *It is multi-touch, but a plastic pointer is an insulator, so it would not register.*
- C. Resistive, as any object pressing on it will register — *Any object works, but it usually detects only one touch at a time.*
- D. Resistive, as its flexible top sheet gives the clearest image — *The plastic top sheet makes the image less clear, and it usually detects one touch only.*

**9 · Mission check**
Your phone screen feels your finger but not your glove. Why?
- A. The screen measures heat, and the glove blocks the heat of your skin — *Phone screens do not measure heat; even a warm glove would not work.*
- B. ✓ It senses a change in charge, which needs a conductor like skin — *Right: a capacitive screen detects your finger drawing charge; gloves are insulators.*
- C. Pressing needs two layers to touch, and a glove spreads the force out — *That describes a resistive screen, which does work with gloves.*
- D. The glove breaks a grid of infra-red beams in the wrong place — *Infra-red screens work with gloves; phones use capacitive screens.*
Shown after answering: Phone screens are capacitive. Your skin conducts electricity, so touching the screen draws a little charge at that point, and the phone measures where. A glove is an insulator, so nothing changes. A resistive or infra-red screen would still work with a glove.

### Mission 2: How can millions of tiny mirrors make a cinema picture?  [module H6b]

*Guess chips:* Each mirror tilts light into the lens or away · The mirrors glow red, green and blue · Each mirror bends to a different angle for each shade · I'm not sure yet

**1 · Teach — Output devices and screens**
> Diagram D1: Side-by-side exploded views of one pixel. LCD: white LED backlight at the back, then a liquid crystal layer, then red/green/blue filters; arrows of light from the backlight, blocked (stopped arrow) for one sub-pixel and passing for the others. LED: three tiny LEDs (red, green, blue) each emitting light forwards, with no layer behind them; label "no backlight".
- An **output device** presents the results of processing in a form people can see, hear or use, or makes something physically happen. Without one, results stay inside the computer.
| Device | How it works |
|---|---|
| **LCD screen** | Each pixel contains **liquid crystals**. A **backlight** (now usually LEDs) shines from behind. A voltage changes the crystals so they block light or let it through, and red, green and blue filters give each pixel its colour. The crystals give out no light themselves [S4] |
| **LED screen** | Each pixel is made of tiny red, green and blue **LEDs** that give out their own light, so no backlight is needed. Very bright, so used for large outdoor and stadium screens [S5] |
- A TV sold as an "LED TV" is usually an LCD screen with an LED backlight [S4].

**2 · Teach — LCD and DLP projectors**
> Diagram D2: Two-panel projector comparison. DLP: lamp → colour wheel (red, green, blue segments) → chip with a close-up of 3 mirrors: two tilted to reflect light into a lens labelled "on", one tilted to send light into a "light absorber" labelled "off". LCD: lamp → dichroic mirrors splitting the beam into red, green and blue → three small LCD panels → prism combining them → lens.
| Device | How it works |
|---|---|
| **DLP projector** | Light shines onto a DLP chip covered in up to 8.8 million tiny **mirrors**, one for each pixel [S2][S3]. Each mirror tilts one way to reflect light into the lens (a bright pixel) or the other way to reflect it away (a dark pixel). Mirrors switch thousands of times a second; the longer a mirror is on, the lighter its shade of grey [S2]. Colour comes from a spinning red, green and blue **colour wheel**, or from three chips, one per colour [S3] |
| **LCD projector** | White light from a bright lamp is split by special mirrors into red, green and blue beams. Each beam passes through its own small **LCD panel**, which blocks or lets through light for each pixel. A **prism** combines the three images, and a lens enlarges and focuses the picture onto the screen [S6] |
- Key difference: DLP **reflects** light off mirrors; LCD passes light **through** liquid crystals.

**3 · Quick check**
In a DLP projector, one pixel must be shown as mid-grey rather than white. What does its mirror do?
- A. It tilts halfway, so only half of the light reaches the lens — *Each mirror has only two positions, on or off; there is no halfway position.*
- B. It glows less brightly, so it gives out less light — *The mirrors give out no light; they only reflect light from the lamp.*
- C. ✓ It flips on and off fast, on for about half the time — *Right: the shade depends on how long the mirror reflects light into the lens.*
- D. It lets half of the light pass through, like a liquid crystal — *Mirrors reflect light; passing light through crystals is how an LCD works.*

**4 · Teach — Inkjet printers**
> Diagram D3: Inkjet print head over paper: nozzles firing droplets downward; inset of one nozzle in two versions: thermal (heater under ink, a bubble pushing a droplet out) and piezoelectric (a crystal flexing to push a droplet out). Motor and belt moving the head sideways; arrow showing the paper moving forward.
| Step | What happens |
|---|---|
| 1 | Data for the page is sent from the computer and stored in the printer's memory (buffer) |
| 2 | Paper is fed in, and a motor moves the **print head** across the page on a belt |
| 3 | The print head fires tiny droplets of **liquid ink** from many nozzles onto the paper |
| 4 | **Thermal** heads heat the ink to form a bubble that pushes a droplet out. **Piezoelectric** heads use a crystal that changes shape when a current is applied, pushing a droplet out without heating [S7] |
| 5 | The paper moves on a little and the next line is printed, until the page is complete |
- Colour inkjets use separate cyan, magenta, yellow and black inks.
- Good for photos and small numbers of copies. The printer is cheap, but ink makes each page cost more.

**5 · Teach — Laser printers**
> Diagram D4: Laser printer cross-section with numbered stages matching the table: (2) charging roller touching the drum, (3) laser beam hitting the drum via a rotating mirror, (4) toner hopper next to the drum, (5) paper passing under the drum with a transfer roller beneath, (6) fuser rollers labelled "heat and pressure", (7) discharge lamp before the charging roller. Drum rotation arrow.
| Step | What happens |
|---|---|
| 1 | Data for the whole page is sent to the printer and stored in its memory [S12] |
| 2 | A rotating **drum** is given an electric charge [S12] |
| 3 | A **laser** scans across the drum, changing the charge on parts of it, so the charge pattern matches the text and images [S8] |
| 4 | Charged powder **toner** sticks only to that pattern on the drum [S8] |
| 5 | The paper is given a charge that pulls the toner off the drum onto the paper [S8] |
| 6 | A **fuser** (heated rollers) melts the toner and presses it onto the paper so it stays [S8] |
| 7 | The charge is removed from the drum, ready for the next page [S12] |
- Fast with a low cost per page, so good for printing many copies.

**6 · Quick check**
In a laser printer, what happens **next**, straight after the laser has scanned across the drum?
- A. ✓ Charged toner sticks to the pattern on the drum — *Right: the laser has made a charge pattern of the page, and toner is attracted to it.*
- B. Heated rollers melt the toner onto the paper — *Fusing is near the end, after the toner has been moved onto the paper.*
- C. The whole drum is given an electric charge — *The drum is charged before the laser scans it, not after.*
- D. Tiny ink droplets are fired from nozzles — *That is an inkjet printer; laser printers use powder toner, not liquid ink.*

**7 · Teach — 3D printers, speakers and actuators**
| Device | How it works |
|---|---|
| **3D printer** | Builds a solid object **layer by layer** from a digital design (made in CAD software or by a 3D scanner). Methods include: plastic melted and squeezed through a moving nozzle; a laser or light hardening liquid **resin**; a laser fusing fine **powder** [S9] |
| **Speaker** | Digital sound data is converted to a varying electrical signal and amplified. The signal flows through a coil attached to a **cone**. The coil becomes a magnet that is pushed and pulled by a permanent magnet, so the cone **vibrates** and makes sound waves [S10] |
| **Actuator** | Turns an electrical signal from a computer or microprocessor into physical **movement**, such as a motor turning, a valve opening or a pump starting [S11] |

**8 · Quick check**
A school office prints about 500 letters a day and wants fast printing at a low cost per page. Which output device is best?
- A. An inkjet printer, as it sprays very fine droplets — *Inkjets are slower and cost more per page in large runs; they suit small runs and photos.*
- B. ✓ A laser printer, as it prints many pages quickly — *Right: laser printers are fast and toner gives a low cost per page in high volumes.*
- C. A DLP projector, as it shows a page to the whole room — *A projector only displays an image; it makes no paper copy.*
- D. A 3D printer, as it builds each page in fine layers — *A 3D printer makes solid objects, not printed letters.*

**9 · Mission check**
How can millions of tiny mirrors make a cinema picture?
- A. The mirrors glow in red, green and blue to make each pixel — *The mirrors give out no light; they reflect light from the lamp.*
- B. Each mirror bends to a different angle for each shade of grey — *Each mirror has only two positions; shades come from how long it stays on.*
- C. The mirrors let the light pass through them onto the screen — *Mirrors reflect light; passing light through panels is how an LCD projector works.*
- D. ✓ Each mirror, one pixel, tilts light into the lens or away — *Right: on sends light through the lens to the screen, off sends it away.*
Shown after answering: Each tiny mirror on the DLP chip controls one pixel. It tilts to reflect light into the lens (bright) or away from it (dark), switching thousands of times a second so the time it spends on sets the shade. A colour wheel, or three chips in a cinema, adds the colour.

### Mission 3: How does your phone know which way up it is?  [module H6c]

*Guess chips:* A sensor feels the pull of gravity · A light sensor sees where the sky is · A compass sensor finds north · I'm not sure yet

**1 · Teach — What a sensor does**
> Diagram D1: Left to right: a thermometer-style icon labelled "physical property: temperature 21 °C" → box "Temperature sensor" (blue) → arrow labelled "readings (data), sent continually" → box "Microprocessor" (purple) → three small outputs: "display it", "store it", "act on it".
- A **sensor** is an input device that **measures a physical property**, such as temperature or light, and sends the reading as data.
- It takes readings **continually** and sends them as data the microprocessor can use.
- A sensor only **measures**. The **microprocessor** uses the data: to show it, store it or act on it.
- Purpose: gather accurate data day and night, even where it is unsafe for people.

**2 · Teach — Sensors for movement and position**
> Diagram D2: Outline of a smartphone with labelled call-outs to sensor positions: "proximity" and "light" near the top earpiece, "accelerometer" and "magnetic field" inside the body, "pressure (air)" inside. Small x, y, z arrows drawn at the accelerometer.
- Your phone contains several different sensors. Each measures one thing.
| Sensor | Data captured | When it is used |
|---|---|---|
| **Accelerometer** | Acceleration along three axes (x, y, z), including the pull of gravity: changes in speed, tilt and direction [S2] | Rotating a phone's screen; counting steps; detecting a crash to set off a car airbag [S3] |
| **Magnetic field** | Strength and direction of a magnetic field [S2] | Phone compass and maps; detecting a magnet moving away when a door or window opens |
| **Proximity** | Whether an object is near, without touching it [S2] | Turning a phone screen off at your ear during a call; car parking sensors |
| **Infra-red** | Infra-red radiation: heat from a moving warm body, or whether an infra-red beam has been broken [S4] | Detecting intruders in a burglar alarm; automatic doors |
| **Pressure** | Pressure or force pressing on it, including air pressure [S2] | Pressure mat in an alarm; tyre pressure; weather station |

**3 · Quick check**
A car's airbag must inflate within a fraction of a second of a crash. Which sensor provides the data that a crash is happening?
- A. Proximity, as it detects the object the car is about to hit — *Being close to something is not a crash; cars pass near objects all the time.*
- B. ✓ Accelerometer, as it detects a very sudden change in speed — *Right: a crash makes the car slow down abruptly, which the accelerometer measures.*
- C. Pressure, as it detects the driver pushing against the seat — *Drivers press on the seat all the time; this does not show a crash.*
- D. Infra-red, as it detects heat from the engine in a collision — *Engine heat is always there and is not a sign of a crash.*

**4 · Teach — Sensors for the air and surroundings**
| Sensor | Data captured | When it is used |
|---|---|---|
| **Temperature** | Temperature (°C) [S2] | Central heating; ovens; greenhouses; weather stations |
| **Humidity** | Amount of **water vapour in the air** (relative humidity, %) [S2] | Greenhouses; museums and art galleries; weather stations |
| **Light** | Light intensity (brightness) [S2] | Street lights switching on at dusk; adjusting screen brightness |
| **Gas** | Amount of a particular gas, such as carbon dioxide, carbon monoxide or oxygen [S5] | Carbon monoxide alarm at home; carbon dioxide in a greenhouse or classroom |
| **Acoustic** | Sound: how loud it is and its pattern | Detecting breaking glass in an alarm; noise monitoring near an airport; voice-activated devices |

**5 · Teach — Sensors for liquids and soil**
> Diagram D3: Garden and water scene: soil bed with a moisture probe pushed into the soil; a water tank with a level sensor at the top of the tank; a pipe from the tank with a flow sensor on it; a small pond with a pH probe in the water. A humidity sensor on a post in the air, labelled to contrast with the moisture probe.
| Sensor | Data captured | When it is used |
|---|---|---|
| **Moisture** | Water content of **soil** or a material [S6] | Watering plants only when the soil is dry; finding damp in walls |
| **Level** | Height of a liquid (or a solid such as grain) in a **container** | Fuel gauge in a car; water tanks; grain silos |
| **Flow** | **Rate** at which a liquid or gas moves through a pipe | Water supply pipes; fuel flow in an engine; air flow in ventilation |
| **pH** | How **acidic or alkaline** a liquid or soil is (pH 0 to 14) | Swimming pools; fish tanks; soil testing; chemical processes |
- Check the context: soil → moisture; air → humidity; container → level; pipe → flow.

**6 · Quick check**
A gardener wants plants watered automatically, but only when the soil becomes dry. Which sensor is most suitable?
- A. Humidity, as it measures how much water is around — *Humidity measures water vapour in the air, not the water in the soil.*
- B. Level, as it measures how full of water the bed is — *A level sensor measures the height of a liquid in a container, such as a tank.*
- C. pH, as watering changes how acidic the soil is — *pH measures acidity; it does not tell you whether the soil is dry.*
- D. ✓ Moisture, as it measures water in the soil — *Right: a moisture sensor measures how wet the soil is.*

**7 · Quick check**
A leisure centre needs the swimming pool water checked automatically, so that it never becomes too acidic. Which sensor is most suitable?
- A. ✓ pH, as it measures how acidic or alkaline the water is — *Right: pH is the measure of acidity, so it detects the water becoming too acidic.*
- B. Gas, as it detects chlorine given off by the water — *A gas sensor measures gas in the air, not how acidic the water is.*
- C. Moisture, as it measures the water content of the pool — *A pool is all water; moisture sensors measure the water in soil or materials.*
- D. Level, as acid makes the water level in the pool fall — *Acidity does not change the water level; a level sensor measures height.*

**8 · Answer**
A factory fills tanks with orange juice. Filling must stop before a tank overflows. Name the type of sensor needed.
Accept: level | level sensor | liquid level | liquid level sensor
Feedback (correct): Right. A level sensor measures the height of the juice in the tank, so the microprocessor knows when it is nearly full.
Feedback (wrong): The juice is in a container and you need to know how high it is. That is a level sensor. A flow sensor would only tell you how fast juice is moving through the pipe, not how full the tank is.

**9 · Mission check**
How does your phone know which way up it is?
- A. A light sensor detects which side the light is coming from — *A light sensor measures brightness only, and the phone still rotates in the dark.*
- B. A proximity sensor detects how close the ground is — *A proximity sensor detects nearby objects, such as your ear during a call.*
- C. ✓ An accelerometer measures the pull of gravity along each axis — *Right: gravity always pulls down, so its direction tells the phone which way is down.*
- D. A magnetic field sensor detects which way is north — *That is the compass; north tells you direction, not which way is up.*
Shown after answering: Your phone has an accelerometer, which measures acceleration along three axes. Even when the phone is still, gravity pulls on it, so the accelerometer can tell which direction is down. The phone's processor uses that data to rotate the screen.

### Recap

- An input device turns something in the real world into data the computer can process; most use a sensor and convert its readings to digital.
- Barcode scanners detect reflected light from bars and spaces; QR scanners use a camera to read a 2D grid of squares.
- Resistive screens need pressure, capacitive screens need a conductor such as skin, infra-red screens detect blocked beams.
- Output devices turn processed data into something seen, heard or done: LCD screens block a backlight, LED screens make their own light.
- DLP projectors reflect light off millions of tilting mirrors; LCD projectors pass light through three LCD panels.
- Inkjets fire liquid ink droplets from a moving head; laser printers use a charged drum, toner and a heated fuser; 3D printers build objects layer by layer.
- A sensor measures one physical property and sends the readings continually as data; the microprocessor uses that data.
- Match the sensor to exactly what must be measured: moisture for soil, humidity for air, level for a container, flow for a pipe.
- Accelerometers measure movement and tilt, including gravity; proximity detects nearby objects; infra-red detects body heat or broken beams.

---

## Software  (Cambridge IGCSE Computer Science (0478/0984) · Topic 4)
Page: `computer-science-gcse-cambridge-igcse-software-mini-lesson.html`

### Mission 1: One CPU core, three apps at once. How is that possible?  [module S1]

*Guess chips:* The OS switches the core between them very fast · The core splits into three mini-processors · Each app waits until the one before it ends · I'm not sure yet

**1 · Teach — The manager between apps and hardware**
> Diagram D1: Layer stack, top to bottom: User → Application software (icons: word processor, browser, game) → Operating system → Hardware (CPU, RAM, storage, input/output devices). Two-way arrows between neighbouring layers labelled "requests" (down) and "results" (up).
- The **operating system (OS)** is system software that manages the hardware and provides a **platform** for applications to run on.
- Apps don't control the hardware themselves: they ask the OS.
- The OS loads apps into memory, starts them and closes them.
- **System software** manages the computer's resources, e.g. the OS and utility software. **Application software** does tasks for the user, e.g. a web browser or a game.

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

**6 · Teach — From power-on to apps**
- **Hardware** is the physical parts of the computer.
- **Firmware** is software stored permanently on a chip in the hardware. The **bootloader** is firmware.
- At switch-on, the bootloader runs on the hardware and loads the OS into memory.
- The OS runs on the firmware, and applications run on the OS: an app needs every layer below it.
- The OS also **handles interrupts** from hardware and software.

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

### Mission 2: You tap a key mid-game. How does the CPU notice straight away?  [module Sx]

*Guess chips:* The key sends a signal that makes the CPU pause · The game checks the keyboard non-stop · The keyboard takes control of the CPU · I'm not sure yet

**1 · Teach — A signal that asks for attention**
> Diagram D1: CPU box in the centre. Left: hardware sources (keyboard, mouse, printer with "paper out") in blue with arrows labelled "interrupt" into the CPU. Right: a "running program" box in orange with two arrows labelled "÷ 0" and "same memory location" into the CPU. Headings "Hardware interrupts" (blue) and "Software interrupts" (orange).
- An **interrupt** is a signal to the processor that something needs attention.
- **Hardware interrupts** come from devices, e.g. pressing a key, moving the mouse, or a printer running out of paper.
- **Software interrupts** come from programs, e.g. a division by zero, or two processes trying to access the same memory location.
- With interrupts, the CPU doesn't waste time repeatedly checking each device.

**2 · Quick check**
Which of these generates a **software** interrupt?
- A. A printer runs out of paper part-way through a job — *The signal comes from a device, so it's a hardware interrupt.*
- B. The user moves the mouse across the screen — *The mouse is a hardware device, so this is a hardware interrupt.*
- C. ✓ A program tries to divide a number by zero — *Right: the error comes from a running program, so it's a software interrupt.*
- D. The user presses the Enter key on the keyboard — *The keyboard is hardware, so the key press is a hardware interrupt.*

**3 · Teach — Handling an interrupt**
> Diagram D2: Flowchart: Fetch → Decode → Execute → diamond "Interrupt waiting?" (No → back to Fetch). Yes → diamond "Higher priority than current task?" (No → back to Fetch). Yes → "Save register contents" → "Run interrupt service routine" → "Restore register contents" → back to Fetch.
- The CPU checks for interrupts at the end of each **fetch–decode–execute** cycle.
- If one is waiting with a higher **priority** than the current task, the CPU **saves its current state**: the contents of its registers.
- It runs the **interrupt service routine (ISR)**: code that deals with that interrupt, e.g. reading which key was pressed.
- Then it **restores** the saved registers and carries on exactly where it stopped.

**4 · Teach — Priorities and results**
- The **operating system** manages interrupts: it gives each type a priority and runs the right ISR.
- Higher-priority interrupts are handled first; others wait their turn. A power failure comes before a mouse movement.
- The result depends on the interrupt: a letter appears on screen, a "paper out" message is shown, or a program that divided by zero stops with an error.

**5 · Quick check**
The CPU finds a waiting interrupt with a higher priority than its current task. What does it do first?
- A. ✓ It saves the contents of its registers so it can carry on later — *Right: saving the state lets the CPU return to the exact instruction it was on.*
- B. It runs the interrupt service routine and abandons the current task — *The current task isn't abandoned; it resumes after the ISR.*
- C. It finishes the whole current program, then deals with the interrupt — *That could take minutes; the CPU responds at the end of the current cycle.*
- D. It restarts the program that it was running from the beginning — *Restarting would lose work; the saved state lets it continue from where it was.*

**6 · Quick check**
Three interrupts are waiting: the mouse moved, a printer ran out of paper, and the power supply is failing. Which ISR runs first?
- A. The mouse, because it was the first of the three to arrive — *Interrupts are handled by priority, not simply in arrival order.*
- B. The printer, because the print job has already been started — *A paper-out message can wait; it isn't urgent compared with losing power.*
- C. The mouse, because it is needed to keep the user in control — *Mouse movement is low priority; a short delay does no harm.*
- D. ✓ The power supply, because it has the highest priority — *Right: data could be lost within moments, so it goes first.*

**7 · Mission check**
You tap a key mid-game. How does the CPU notice straight away?
- A. The game checks the keyboard non-stop, so it can't miss a key — *Constant checking would waste processor time; instead the keyboard signals the CPU.*
- B. ✓ The key sends an interrupt, which the CPU checks for each cycle — *Right: it saves its state, runs the ISR, then carries on with the game.*
- C. The keyboard pauses the game itself until the CPU has time free — *A keyboard can't control the game; it only sends a signal to the CPU.*
- D. The CPU finishes the game's current program, then reads the key — *That would take far too long; the CPU responds at the end of the current cycle.*
Shown after answering: Pressing the key sends a hardware interrupt to the CPU. The CPU checks for interrupts at the end of every fetch–decode–execute cycle, so within moments it saves its registers, runs the interrupt service routine for the keyboard, then restores its registers and carries on with the game.

### Mission 3: Why write a 1999 hit game almost entirely in assembly?  [module S2]

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
- An **assembler** translates assembly language into machine code.
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
Total ← Price + Tax
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

### Mission 4: Why do some languages show all your errors, and others just one?  [module S3]

*Guess chips:* One translates all the code first, one goes line by line · Some languages have stricter spell-checkers · One sends your code to a faster processor · I'm not sure yet

**1 · Teach — Why translate?**
> Diagram D1: Flow: "Source code" (page icon) → "Translator" (cog) → "Machine code" (binary) → CPU. Below, lanes: High-level → Compiler / Interpreter; for A C Q I a third lane Assembly → Assembler.
- The CPU can only execute machine code, so the **source code** that programmers write must be **translated** first.
- A **translator** is a program that converts source code into a form the CPU can execute.
- High-level code is translated by a **compiler** or an **interpreter**.
- Assembly is translated by an **assembler**: each assembly instruction becomes one machine code instruction.

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
- An assembler is used when a program is written in assembly, e.g. for embedded systems or device drivers.

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

### Mission 5: How can a program tell you which line your bug is on?  [module S5]

*Guess chips:* The IDE's tools check the code and report the line · The computer guesses from where you last typed · The CPU keeps a list of every line it ran · I'm not sure yet

**1 · Teach — One program for writing, running and fixing code**
> Diagram D1: Mock IDE window: editor pane with line numbers 1–5 and colour-coded keywords (keywords purple, strings green), a Run button (labelled "translator"), an output pane and an error pane (empty). For O C label the output pane "run-time environment".
- An **Integrated Development Environment (IDE)** is software that puts tools for writing, translating, running and debugging code in one place.
- The **editor** is where you write and edit code. It shows line numbers, colours keywords and indents code automatically, so code is easier to read.
- **Auto-completion** suggests the rest of a word as you type; **auto-correction** fixes common typing mistakes; **prettyprint** lays code out with clear indents and colours.

**2 · Teach — Translate, run and diagnose**
- The IDE includes a **translator**, so you can **compile or interpret** your code with one click.
- The **run-time environment** runs your program inside the IDE: you see its output and enter input, and if it crashes the IDE shows what went wrong.
- **Error diagnostics** report each error with a message and its line number, and highlight that line.

**3 · Calculate**
```
Total ← 0
FOR Count ← 1 TO 3
    Total ← Total + Count
NXET Count
OUTPUT Total
```

You run this program in an IDE. Which line number will the error diagnostics highlight?
Answer: 4  (accepted: [[4.0, 4.0]])
Feedback (correct): Right: line 4 has a misspelt keyword, so the error message points to line 4.
Feedback (wrong): Count the lines from 1. Lines 1–3 follow the rules; line 4 misspells NEXT, so that is the line reported.

**8 · Quick check**
As you type `OUTP`, the IDE offers to finish it as `OUTPUT`. Which IDE function is this?
- A. Prettyprint, which lays out code with indents and colours — *Prettyprint changes how code looks, not what you type.*
- B. Error diagnostics, which report errors with line numbers — *Nothing is wrong yet; the IDE is offering to finish the word.*
- C. Auto-correction, which fixes common typing mistakes — *Auto-correction changes something you mistyped; OUTP isn't finished yet.*
- D. ✓ Auto-completion, which suggests the rest of a word — *Right: it predicts the keyword you are typing and offers to finish it.*

**9 · Quick check**
A classmate's long program has no indentation and is hard to follow. Which IDE feature helps most?
- A. The run-time environment, to run the code and see its output — *Running it shows what it does, not how its structure is laid out.*
- B. The translator, to turn the code into machine code faster — *Translation doesn't make source code easier for a person to read.*
- C. ✓ Prettyprint, to lay the code out with clear indents — *Right: indentation shows where each loop and selection block starts and ends.*
- D. Error diagnostics, to report the line numbers of any errors — *The code may have no errors at all; its layout is the problem, not its rules.*

**10 · Mission check**
How can a program tell you which line your bug is on?
- A. The CPU remembers every line it ran and prints the last one — *The CPU runs machine code; it doesn't keep your source lines.*
- B. The editor guesses the line from where you last typed — *The reported line can be anywhere, not just where you were typing.*
- C. ✓ The translator checks it and error diagnostics name the line — *Right: the error message gives the line number and the editor highlights it.*
- D. The run-time environment rewrites the line that went wrong — *It runs your code but never rewrites it; you fix the line yourself.*
Shown after answering: The IDE translates your code, and when the translator (or the running program) hits a problem, the error diagnostics report a message with the line number. Because the editor numbers every line, you can go straight to the bug.

### Recap

- The OS is system software that manages the hardware and gives applications a platform to run on.
- It shares the processor between processes (multitasking) and shares out memory, and manages peripherals using device drivers.
- It also manages files, the user interface, user accounts and security.
- An interrupt is a signal to the CPU that something needs attention; it can come from hardware or software.
- The CPU checks for interrupts after each fetch–decode–execute cycle, saves its registers, runs the interrupt service routine, then restores its registers and carries on.
- The operating system manages interrupts by priority, so urgent ones are handled first.
- The CPU only runs machine code (binary); assembly uses mnemonics with a 1:1 match to machine code. Both are low-level and tied to one processor family.
- High-level languages are easier to write, read and debug and are machine independent, but must be translated.
- Low-level suits device drivers, embedded systems and speed-critical code; high-level suits most applications.
- Source code must be translated before the CPU can run it: a compiler translates the whole program into an executable; an interpreter translates and runs it line by line.
- Interpreters suit development and testing; compilers suit the final program; assemblers translate assembly language.
- An IDE puts an editor, a translator, a run-time environment and error diagnostics in one program.
- Editor features such as line numbers, colour coding and auto-completion and prettyprint make code easier to write and read.

---

## The internet and its uses  (Cambridge IGCSE Computer Science (0478/0984) · Topic 5)
Page: `computer-science-gcse-cambridge-igcse-the-internet-its-uses-mini-lesson.html`

### Mission 1: Routers only use numbers. How does a typed web address find its site?  [module N5]

*Guess chips:* A server swaps the name for a number · Routers search every website for the name · A search engine finds the site for you · I'm not sure yet

**1 · Teach — Reading a web address**
> Diagram D1: The URL `https://www.example.org/physics/waves.html` in a large monospace line, with coloured brackets underneath. **O C I version:** three brackets: "https://" = protocol (blue), "www.example.org" = domain name (green), "/physics/waves.html" = web page / file name (orange). **Q version:** five brackets: "https" = scheme, "www" = subdomain, "example" = second level domain, ".org" = top level domain, "/physics/" = sub directory; "waves.html" left grey and unlabelled.
- The **internet** is a worldwide collection of computer networks: the infrastructure.
- The **world wide web** is the collection of websites and web pages you reach *using* the internet.
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
- The **DNS** (domain name server) matches **domain names** to **IP addresses**.
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

**6 · Teach — What a browser does**
- A **web browser**'s main job is to **render** HTML and display web pages.
- It also stores **bookmarks**, records **history**, allows multiple **tabs**, and provides **navigation** tools and an **address bar**.
- It stores **cookies**: small files a website saves on your device, used to save personal details, preferences, cart items and logins.
- **Session** cookies are deleted when the browser closes; **persistent** cookies stay until they expire or are deleted.

**7 · Teach — Digital currency and blockchain**
> Diagram D4: Three blocks in a row, each a card with: Block number, Timestamp, Transactions (e.g. "A → B 0.5"), Previous hash, Hash. Arrows link each block's Hash to the next block's Previous hash. A second state shows block 2 edited (red), its hash changed, and the link to block 3 broken (red cross).
- A **digital currency** exists only electronically, with no notes or coins.
- **Blockchain** tracks its transactions: a digital **ledger** of time-stamped records that cannot be altered.
- Each block stores transactions, a timestamp, its own **hash** and the previous block's hash. Many computers hold copies.
- Altering a block changes its hash, so the next block no longer links to it and the tampering is spotted.

**9 · Mission check**
Routers only use numbers. How does a typed web address find its site?
- A. Routers compare the name with every website until one matches — *Routers forward packets by IP address; they never search for names.*
- B. A search engine looks up the name and opens the closest site — *A search engine is a website itself; reaching it needs the same lookup.*
- C. The web server's IP address is stored inside the URL you type — *The URL holds a domain name, not an IP address; something has to convert it.*
- D. ✓ A DNS server converts the domain name into an IP address — *Right. The browser then sends an HTTP(S) request to that IP address.*
Shown after answering: The browser sends the domain name to a DNS server, which returns the web server's IP address (asking other DNS servers if it doesn't know). Routers then carry the HTTP or HTTPS request to that address, and the web server sends back the page for the browser to render.

### Mission 2: In 2020, hackers hijacked famous Twitter accounts. What did they hack?  [module C1]

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

**5 · Teach — Pharming**
> Diagram D3: Pharming: user types `www.northbank.co.uk` (correct). Top path (grey dashed, "normal"): to the real bank server. Bottom path (red, "pharmed"): malicious code icon on the PC (and, for C I, a DNS server icon with a tampered record `northbank.co.uk → 203.0.113.66`) diverts to a fake server showing an identical login page.
- **Pharming**: redirecting a website's traffic to a fake website, so even a correctly typed address leads to the fake.
- Malicious code on the user's computer or a server changes where the address leads.
- For example, DNS records are altered to point to the attacker's server.
- Unlike phishing, there's no link to click.
- Protection: anti-malware; check the address bar and padlock (HTTPS) before logging in.

**6 · Quick check**
Sam typed his bank's correct web address himself, but the login page that appeared was a fake that stole his password. Which attack is this?
- A. Phishing — *Phishing tricks you into clicking a link in a message; Sam typed the correct address himself.*
- B. Data interception — *Data interception captures data in transit; it does not send Sam to a fake page.*
- C. Brute-force attack — *A brute-force attack guesses passwords repeatedly; here Sam typed it into a fake page.*
- D. ✓ Pharming — *Right. Pharming redirects traffic from a correctly typed address to a fake site.*

**7 · Teach — Protecting against social engineering**
- **Training**: users learn the warning signs.
- Check the real web address (URL) behind a link before clicking it.
- Check **spelling and tone**: errors, generic greetings or urgent, threatening wording suggest a fake.
- Verify requests through a contact you already know, not one in the message. Never share a password.
- Set **privacy settings** so strangers can't see details to use in a scam.

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

### Mission 3: The fix was out by March. Why did WannaCry still hit the NHS in May?  [module C2]

*Guess chips:* The NHS had no antivirus at all · Many computers never got the fix · It was too new for any fix to work · I'm not sure yet

**1 · Teach — Malware**
> Diagram D1: A laptop in the centre with arrows in from labelled icons: "Email attachment" (paperclip), "Download" (arrow into tray), "Infected website" (browser window), "Software weakness" (cracked shield). Malware drawn as a red bug icon travelling along each arrow.
- **Malware** (malicious software): an umbrella term for hostile or intrusive software.
- It can delete or encrypt files, steal data, record typing, or let an attacker take control.
- Ways in: email attachments, downloads, infected websites and software weaknesses.

**2 · Teach — Forms of malware**
- **Virus**: attaches to a file or program; spreads when that file is run or shared.
- **Worm**: copies itself across a network on its own.
- **Trojan horse**: pretends to be useful software but carries hidden malware.
- **Spyware**: secretly records what you do and reports it to the attacker.
- **Ransomware**: encrypts files and demands payment for the key.
- **Adware**: shows unwanted adverts.

**3 · Quick check**
Mia downloads a free photo editor. It works well, but it also secretly lets a stranger control her laptop. Which type of malware is it?
- A. ✓ Trojan horse — *Right. It is disguised as useful software and carries hidden malicious code.*
- B. Virus — *A virus attaches to existing files and spreads when they run or are shared; this program was the disguise itself.*
- C. Spyware — *Spyware secretly gathers information; the key feature here is the useful-looking disguise.*
- D. Phishing — *Phishing is social engineering using fake messages, not a type of malicious program.*

**4 · Teach — Vulnerabilities and patches**
> Diagram D2: Timeline left to right: "Weakness found" → "Patch released" (green) → "Attack begins" (red). Below the timeline, two computers: "Patch installed" with green shield, malware bouncing off; "Not patched" with red cross, malware getting in.
- A **vulnerability** is a weakness in software that an attacker can exploit.
- The maker then releases a **patch**: an update that fixes it.
- **Unpatched or outdated software** still has the weakness. An operating system that no longer gets updates can't be fixed.
- **Hacking**: gaining unauthorised access to a computer system, often via a vulnerability, to steal, change or delete data.
- **Automatic software updates** install patches as soon as they're out.

**5 · Teach — Anti-malware software**
- **Anti-malware** scans files, downloads and memory for malware.
- It compares code with a database of known malware and also flags suspicious behaviour.
- Malware it finds is quarantined (isolated) or deleted.
- It needs regular updates, or it can't recognise new malware.
- It includes **anti-virus** and **anti-spyware**.

**6 · Quick check**
A school's computers all run anti-malware, but they use an old operating system that no longer gets updates. New malware spreads through a weakness in that system. Which change protects them best?
- A. Run a full anti-malware scan on every computer each night — *A scan may catch known malware after it arrives, but the weakness it uses stays open.*
- B. Make all staff passwords longer and harder to guess — *This malware uses a software weakness, so it doesn't need anyone's password.*
- C. Back up every computer's files to a separate drive each evening — *Backups help recovery after an attack but don't stop the infection.*
- D. ✓ Move to a supported operating system and install its patches — *Right. Only a patch removes the vulnerability, and unsupported systems never get one.*

**7 · Teach — Attacks on networks**
- **Brute-force attack**: trying every possible password until one works. Aim: get into an account. Defence: long passwords, lock-outs.
- **Distributed denial of service (DDoS)**: flooding a server with requests so real users can't get in. Aim: disruption or blackmail.
- "Distributed": many infected computers send requests at once.
- **Data interception**: capturing data as it travels across a network, e.g. by packet sniffing. Aim: steal data. Defence: encryption.

**9 · Quick check**
A game's login server suddenly gets millions of fake requests every second, and real players can't log in. Which attack is this?
- A. A brute-force attack — *A brute-force attack keeps guessing passwords to get in; here the aim is to block everyone out.*
- B. ✓ A DDoS attack — *Right. Flooding a server with requests stops genuine users reaching it.*
- C. Data interception — *That captures data in transit; it doesn't stop players reaching the server.*
- D. Pharming — *Pharming redirects users to a fake site; it doesn't overload the real one.*

**11 · Mission check**
The fix was out by March. Why did WannaCry still hit the NHS in May?
- A. It was so new that no update could have stopped it — *The fix already existed; alerts to install it went out in March and April.*
- B. The NHS had no anti-malware on any of its computers — *Anti-malware alone can't close a software weakness; the missing piece was the patch itself.*
- C. ✓ Many PCs never installed it, or ran Windows too old for it — *Right. A patch only protects the computers that install it.*
- D. Staff typed their passwords into a fake NHS login page — *That would be phishing; WannaCry got in through a software vulnerability, not stolen passwords.*
Shown after answering: The National Audit Office found that the infected NHS organisations had unpatched or unsupported Windows operating systems [S1]. A patch only protects computers that install it, so the malware spread to the ones that hadn't.

### Mission 4: Thieves reached a store's card tills via its air-con firm. How?  [module C3]

*Guess chips:* They cracked the card data's encryption · The firm's login reached too far · Till staff were tricked into helping · I'm not sure yet

**1 · Teach — Access levels**
> Diagram D1: Access grid. Rows: Student, Teacher, Network admin. Columns: Homework folder, Exam papers, Network settings. Cells: Student = Read / None / None; Teacher = Read+Write / Read+Write / None; Admin = Read+Write / Read+Write / Read+Write. "None" cells grey with a lock icon.
- **Access levels** set which users can read, change or delete each file, folder or system.
- Each person gets only the access their role needs: a pupil can't open exam papers.
- An administrator sets and reviews them.

**2 · Teach — Passwords and authentication**
- **Authentication** checks that a user really is who they claim to be, e.g. with a username and password.
- A strong password is long, mixes character types, isn't a dictionary word and isn't reused.
- Systems should lock an account after a few wrong attempts, which defeats guessing.

**3 · Teach — Firewalls**
> Diagram D2: Internet cloud → firewall (brick wall with a rule list: "Allow: web traffic to web server", "Block: everything else from outside") → office LAN. Two packets: green one passes, red one bounced back. A second, internal firewall separates the "Office" zone from a "Finance" zone.
- A **firewall** monitors incoming and outgoing network traffic and allows or blocks it using a set of security rules.
- Firewalls inside a network stop traffic from one part reaching a more sensitive part.
- A **proxy server** sits between users and the internet: it forwards requests, hides users' IP addresses and filters traffic.

**4 · Quick check**
A school lets its catering supplier log in to its network to update the lunch menu. Which setting best protects pupils' records?
- A. Give the supplier's account a long, strong password — *A strong password stops guessing, but whoever logs in can still reach everything the account allows.*
- B. ✓ Limit the supplier's account to the menu system — *Right. Limiting access to what the role needs means a stolen supplier login can't reach pupil data.*
- C. Install anti-malware on the school's main server — *Anti-malware detects malicious software; it doesn't control what a valid login can reach.*
- D. Make the supplier change its password every week — *A new password is still a full-access password; what the account can reach hasn't changed.*

**5 · Teach — Beyond passwords**
- **Biometrics**: a fingerprint or face proves who you are. It can't be forgotten and is hard to copy.
- **Two-step verification**: a second piece of evidence is needed as well as the password, e.g. a code sent to your phone, or a bank card plus its PIN.

**6 · Teach — Encryption as a defence**
> Diagram D3: Sender: "Card: 4929 1234 5678 9012" → padlock "encrypt with key" → network line showing "h8$Kq!z0Lw…" → attacker eavesdropping sees only the scrambled text → receiver with key → original text.
- **Encryption** scrambles data using a key, so only someone with the right key can read it.
- Data intercepted or stolen while encrypted is useless to an attacker without the key.
- Encrypt data sent across network connections, wired or wireless (e.g. HTTPS websites, wireless networks), and stored data.

**7 · Teach — SSL**
- **Secure socket layer (SSL)** is a security protocol that encrypts data sent between a web browser and a web server.
- The server proves who it is with an **SSL certificate**, issued by a trusted authority.
- The browser checks the certificate. If valid, an encrypted connection is set up for all the data.
- You see **https** and a padlock. Its newer version is called TLS.

**8 · Quick check**
An attacker has stolen a user's password from another website. Which solution would still stop them logging in to the user's bank account?
- A. A proxy server on the network — *A proxy hides the user's IP address and filters traffic; it doesn't stop someone logging in with a correct password.*
- B. SSL on the bank's website — *SSL encrypts data in transit; the attacker can still log in over an encrypted connection.*
- C. Anti-spyware software — *Anti-spyware removes spying software; the password was already stolen elsewhere.*
- D. ✓ Two-step verification — *Right. The attacker also needs the code sent to the user's phone, which they don't have.*

**13 · Mission check**
Thieves reached a store's card tills via its air-con firm. How?
- A. They broke the encryption on card data as it crossed the internet — *The attackers didn't need to break any encryption; they came in through a legitimate route.*
- B. Till staff were tricked into installing the thieves' software — *The route started at an outside supplier, not with staff at the tills.*
- C. ✓ The firm's login got them in, and the network didn't stop them — *Right. Weak access limits and poor separation let a supplier's foothold reach the most sensitive systems.*
- D. A bug in the air-con system itself took control of the tills — *The way in was the supplier's network access, not the air-con machinery.*
Shown after answering: The retailer had given an air-con firm remote access to its network, and attackers used that foothold [S1][S2]. A US Senate report found the retailer had not isolated its most sensitive systems from the rest of its network, so the attackers moved on to the card tills [S1][S2]. Access levels limiting the supplier to its billing system, and firewalls between parts of the network, could have blocked that route.

### Recap

- A URL holds a domain name; a DNS server converts it into the web server's IP address.
- The browser requests the page with HTTP or HTTPS (encrypted) and renders the HTML that comes back.
- Cookies store details on your device; blockchain is a tamper-evident ledger for digital currency.
- Social engineering manipulates people into giving away information or access: people are often the weakest point in a system.
- Phishing uses fake messages and fake websites to steal details; check links, verify through a known contact, never share passwords.
- Pharming sends you to a fake site even when you type the correct address.
- Malware is hostile software; it gets in through attachments, downloads, websites and weaknesses in software.
- Patches fix vulnerabilities, but only once installed; anti-malware must be kept up to date to recognise new malware.
- Network attacks include brute force, DDoS and data interception; each has its own defence.
- Access levels give each user only what their role needs; authentication proves who a user is; firewalls allow or block traffic using rules.
- Encryption makes intercepted or stolen data unreadable without the key.

---

## Automated and emerging technologies  (Cambridge IGCSE Computer Science (0478/0984) · Topic 6)
Page: `computer-science-gcse-cambridge-igcse-automated-emerging-technologies-mini-lesson.html`

### Mission 1: Nobody touches the greenhouse. So what turns the water on?  [module A1]

*Guess chips:* The microprocessor, after checking a sensor reading · The moisture sensor switches the pump on itself · A timer just waters it every hour · I'm not sure yet

**1 · Teach — Sensor, microprocessor, actuator**
> Diagram D1: Greenhouse block diagram: three boxes left to right, "Moisture sensor" → "Microprocessor" → "Actuator (water pump)", with arrows labelled "readings (data)" and "signal". Small greenhouse sketch behind. Sensor box in blue (input role), microprocessor in purple (decision), actuator in orange (action).
- An **automated system** does a task with no human controlling it.
- A **sensor** measures a physical quantity, such as moisture, temperature or light, and sends the reading as data.
- A **microprocessor** processes that data and decides what to do.
- An **actuator** receives a signal from the microprocessor and causes a physical action, such as a motor turning or a valve opening.

**2 · Teach — The control loop**
> Diagram D2: Control-loop flowchart in Cambridge flowchart symbols: terminator START; input/output "Read moisture sensor"; decision "Moisture < stored value?"; Yes → input/output "Send signal: pump ON"; No → input/output "Send signal: pump OFF"; both arrows loop back to "Read moisture sensor".
- The sensor **continually** sends its readings to the microprocessor as **digital data**.
- The microprocessor **compares** each reading with a **stored (preset) value**.
- If the reading is out of range, it sends a **signal to the actuator**, for example to switch the pump on.
- If it is in range, the actuator is switched off or left off.
- The loop **repeats continuously**, so the system reacts as conditions change.

**3 · Quick check**
In an automated greenhouse, which component decides that the soil is too dry?
- A. The moisture sensor, because it measures the soil — *The sensor only measures and sends data; it does not compare or decide.*
- B. ✓ The microprocessor, which compares the reading with a limit — *Right: the microprocessor processes the data and decides whether to signal the actuator.*
- C. The actuator, because it controls the water valve — *The actuator only carries out the action it is signalled to do.*
- D. The stored preset value, because it holds the dry limit — *The preset value is just data; something must process it.*

**4 · Teach — Automated systems in different scenarios**
- The same three parts appear in every scenario. Only the sensors and actuators change.
| Scenario | Example system | Sensor(s) | Actuator / action |
|---|---|---|---|
| Lighting | Street lights | Light | Switch lamps on at dusk |
| Agriculture | Greenhouse | Moisture, temperature, humidity | Pump, valves, heater, window motor |
| Industry | Chemical plant | Level, pressure, temperature | Valves, conveyor motors |
| Transport | Automatic train doors | Proximity, pressure | Door motors |
| Weather | Weather station | Temperature, humidity, pressure | Readings logged and sent automatically |
| Gaming | Motion controller | Accelerometer | Vibration motor (feedback) |
| Science | Lab experiment | Temperature, pH | Heater; readings logged at set intervals |

**5 · Calculate**
```
HoursOn ← 0
FOR Hour ← 1 TO 6
  IF Moisture[Hour] < 40
    THEN
      HoursOn ← HoursOn + 1
  ENDIF
NEXT Hour
OUTPUT HoursOn
```

The greenhouse microprocessor checks the soil once an hour for 6 hours. The readings (%) are stored in `Moisture[1]` to `Moisture[6]`: 52, 41, 38, 40, 35, 47. What is output?
Answer: 2  (accepted: [[2.0, 2.0]])
Feedback (correct): Right. Only 38 and 35 are below 40, so the pump is signalled in 2 hours.
Feedback (wrong): Check each reading against `< 40`: 52 no, 41 no, 38 yes, 40 no (40 is not less than 40), 35 yes, 47 no. That gives HoursOn = 2.

**6 · Teach — Advantages and disadvantages**
| Advantages | Disadvantages |
|---|---|
| Works 24 hours a day without breaks | High set-up cost |
| Reacts faster and more consistently than a person | Needs maintenance; a faulty sensor can cause wrong actions |
| Keeps people away from dangerous places | Cannot deal with situations it was not programmed for |
| Uses resources only when needed (less waste) | Fewer jobs for manual workers; skilled technicians needed |
| Lower running costs over time | If networked, it could be hacked |
- In an exam, link each point to **the given scenario**, not just a general list.

**7 · Quick check**
A town replaces timer-controlled street lights with lights controlled by a light sensor and a microprocessor. Which is a valid advantage?
- A. The lights will never need maintenance again — *Sensors and lamps still fail and need checking or replacing.*
- B. The new system will be cheaper to install — *Automated systems usually have a higher set-up cost.*
- C. ✓ Lamps come on only when it is dark, saving energy — *Right: the system reacts to real light levels, including dark winter afternoons and storms.*
- D. The light sensor can decide when to switch on without a program — *The sensor only measures; the microprocessor runs a program to decide.*

**8 · Quick check**
An automated system must keep a fish tank at 25 °C. Which sensor and actuator should it use?
- A. ✓ A temperature sensor and a heater — *Right: the sensor measures the water temperature and the heater changes it.*
- B. A pH sensor and a heater — *A pH sensor measures acidity, not temperature.*
- C. A temperature sensor and an LCD screen — *A screen can show the reading but cannot change the temperature.*
- D. A light sensor and a water pump — *Light level and pumping do not measure or control temperature.*

**9 · Mission check**
Nobody touches the greenhouse. So what turns the water on?
- A. The moisture sensor switches the pump on when the soil is dry — *A sensor only measures and sends data; it does not switch anything.*
- B. A timer turns the water on every hour, needed or not — *That ignores the sensor, so it would water soil that is already wet.*
- C. The actuator measures the soil and then opens itself — *An actuator acts on a signal; it does not measure.*
- D. ✓ The microprocessor checks readings against a stored value — *Right: when the reading is too low it signals the actuator to start the pump.*
Shown after answering: A moisture sensor sends readings to a microprocessor, which compares them with a stored value. When the soil is too dry, the microprocessor signals an actuator (a pump or valve) to water it, and the loop repeats continuously.

### Mission 2: Robot vacuum or remote-control car: which one is the robot?  [module A2]

*Guess chips:* The vacuum, because it is programmed to act alone · Both, because they each have motors and move · Neither, because a real robot looks like a person · I'm not sure yet

**1 · Teach — What robotics is**
- **Robotics** is a branch of computer science that incorporates the **design, construction and operation** of robots.
- Examples include **factory equipment** (robot arms), **domestic robots** (robot vacuums, lawn mowers) and **drones**.
- A robot does **not** have to look like a person. It is a robot because of its characteristics, not its shape.

**2 · Teach — Characteristics of a robot**
> Diagram D1: Cut-away top view of a robot vacuum with callouts colour-coded by characteristic: grey for mechanical structure (body shell, wheels, brushes); blue for sensors (front bump sensor, cliff sensors underneath, dirt sensor); purple for the microprocessor; orange for actuators (wheel motors, brush motor, suction fan motor); a green dashed box "stored program: cleaning route, schedule" linked to the microprocessor.
| Characteristic | What it means | Robot vacuum example |
|---|---|---|
| **Mechanical structure or framework** | A physical body that can move or hold parts | Body, wheels, brushes |
| **Electrical components** | Sensors, a microprocessor and actuators | Bump and dirt sensors; microprocessor; wheel and brush motors |
| **Programmable** | It follows a stored program, which can be changed | Cleaning routes and schedules set by its program |
- Sensors detect, the microprocessor decides, actuators move, just as in an automated system.

**3 · Quick check**
A factory robot arm has a camera that spots faulty parts. Which characteristic of a robot does the camera belong to?
- A. Mechanical structure or framework — *The camera may be fixed to the frame, but it is an electrical sensor, not part of the structure.*
- B. Programmable — *Being programmable is about the stored program, not a piece of hardware.*
- C. ✓ Electrical components — *Right: the camera is a sensor, one of the robot's electrical components.*
- D. None, because cameras are input devices — *Sensors are input devices, and they are exactly what a robot uses to detect its surroundings.*

**4 · Teach — Roles robots perform**
> Diagram D2: Strip of six simple icons, one per spec area, each labelled with the area name and one role: Industry (robot arm welding a car door), Transport (delivery drone), Agriculture (milking robot at a cow), Medicine (robot arm beside an operating table, a surgeon at a console), Domestic (robot lawn mower), Entertainment (animatronic dinosaur).
| Area | Example roles |
|---|---|
| Industry | Welding and spray-painting car bodies; moving goods in warehouses |
| Transport | Driverless vehicles; delivery drones |
| Agriculture | Milking cows; picking fruit; drones spraying crops |
| Medicine | Assisting surgeons with very precise movements; dispensing medicines |
| Domestic settings | Vacuuming floors; mowing lawns |
| Entertainment | Animatronic figures in theme parks; robot toys; camera drones filming events |

**5 · Teach — Advantages and disadvantages**
| Advantages | Disadvantages |
|---|---|
| Work 24 hours a day without breaks or tiredness | Expensive to buy, set up and maintain |
| Consistent, precise work, so fewer errors | Only do the tasks they are programmed for |
| Can do dangerous, dirty or repetitive jobs | Struggle with unexpected situations |
| Often faster than people; no wages | Some jobs lost; skilled engineers needed instead |
- Link each point to the role in the question (for example, precision matters most in medicine).

**6 · Quick check**
A supermarket uses robots to collect items for online orders in its warehouse. Which is a disadvantage of using the robots?
- A. They can work through the night without breaks — *That is an advantage, not a disadvantage.*
- B. ✓ They cost a lot to buy, set up and maintain — *Right: high set-up and maintenance costs are a key disadvantage.*
- C. They make more mistakes as they get tired — *Robots do not get tired; consistency is one of their advantages.*
- D. They need a new body for each new type of item — *Being programmable means they can often be reprogrammed instead of rebuilt.*

**7 · Quick check**
A car factory switches its robot arm from welding doors to welding bonnets without rebuilding it. Which characteristic makes this possible?
- A. Its mechanical structure, because the arm can bend — *The arm could always move; the change of task comes from new instructions.*
- B. Its sensors, because they detect the new part — *Sensors detect the part, but they do not change what the arm is told to do.*
- C. Its actuators, because the motors are powerful — *Motor power does not change the task the arm carries out.*
- D. ✓ It is programmable, so it can get a new program — *Right: a stored program can be changed to give the robot a new task.*

**8 · Mission check**
Robot vacuum or remote-control car: which one is the robot?
- A. Both, because each has wheels, motors and electronics — *Those cover structure and electrical components, but the car is not programmable.*
- B. Neither, because neither of them looks like a person — *Robots do not need a human shape; drones and robot arms are robots.*
- C. ✓ The vacuum, because it runs a stored program by itself — *Right: it has all three characteristics, including being programmable.*
- D. The car, because a person can control it more precisely — *Control by a person is not the test: the car has no stored program, so it is not programmable.*
Shown after answering: Both have a mechanical structure and electrical components, but only the vacuum is programmable: it follows a stored program and acts without a person steering it. A basic remote-control car just obeys the handset, so it is not a robot.

### Mission 3: A spam filter blocks a scam it has never seen. How?  [module A3]

*Guess chips:* It learned patterns from past emails and adapted · A programmer wrote a rule for that exact email · It checks each email against a fixed list of scams · I'm not sure yet

**1 · Teach — What AI is**
- **Artificial intelligence (AI)** is a branch of computer science dealing with the **simulation of intelligent behaviours** by computers.
- Its main characteristics:
  - a **collection of data** and the **rules** for using that data
  - the ability to **reason**: use the data and rules to reach new conclusions
  - it **can** include the ability to **learn and adapt**

**2 · Quick check**
A chess program meets a position it has never seen. Without changing its own program or data, it works out a strong move from the rules of chess and its stored data. Which characteristic of AI is this mainly showing?
- A. The ability to learn and adapt — *Learning means changing its own processes or data, and the stem says it does not.*
- B. Using sensors and actuators — *Those belong to automated systems and robots, not to the definition of AI.*
- C. Storing a fixed list of moves — *A list alone cannot handle a position it has never seen.*
- D. ✓ The ability to reason — *Right: it applies rules to data to reach a new conclusion.*

**3 · Teach — Expert systems**
> Diagram D1: Expert system block diagram: User ↔ Interface ↔ Inference engine; Inference engine linked to two stores, Knowledge base (facts) and Rule base (IF–THEN rules). A "Human expert" figure feeds the knowledge base and rule base with a dashed arrow labelled "when built". Interface in blue, inference engine in purple, the two bases as cylinder stores in grey.
- An **expert system** gives advice or a diagnosis like a human expert in one area, such as medicine or car repair.
- **Knowledge base**: the facts about the area, gathered from human experts.
- **Rule base**: the IF–THEN rules for using those facts.
- **Inference engine**: applies the rules to the facts and the user's answers to reach a conclusion.
- **Interface**: asks the user questions and shows the conclusion.

**4 · Teach — How an expert system works**
- The **interface** asks a question, such as "Is there a rash?", and the user answers.
- The **inference engine** searches the knowledge base and rule base for rules matching the answers.
- It may ask more questions.
- The interface shows the conclusion or advice, often with how likely it is.
- Example: MYCIN (Stanford, 1970s) used about 500 IF–THEN rules to diagnose blood infections and meningitis and suggest antibiotics [S3].

**5 · Quick check**
Which part of an expert system matches the user's answers against the IF–THEN rules to reach a conclusion?
- A. The knowledge base — *The knowledge base stores the facts; it does not apply rules.*
- B. The interface — *The interface asks questions and displays results, but does not reason.*
- C. ✓ The inference engine — *Right: it applies the rules to the facts and the answers.*
- D. The rule base — *The rule base stores the rules, but another part applies them.*

**6 · Teach — Machine learning**
> Diagram D2: Side-by-side comparison. Left "Expert system": rules written by people → fixed rules → output; a padlock icon on the rules. Right "Machine learning": many labelled example emails (spam / not spam) → program → output, with a feedback arrow "new data" curving back to update the program.
- **Machine learning** is when a program has the ability to **automatically adapt its own processes and/or data**.
- It is trained on many examples, such as emails marked "spam" or "not spam", and finds patterns.
- As new data arrives it updates itself, so its results can improve without a programmer rewriting the code.
- Compare: an expert system's rules are written by people and stay the same until someone edits them.

**7 · Answer**
R1: IF engine will not start AND lights are dim THEN "battery is flat" R2: IF engine will not start AND lights are bright THEN "check starter motor" R3: IF engine starts AND engine overheats THEN "check coolant level" Through the interface, the user answers: the engine will not start; the lights are bright. What conclusion does the inference engine reach?

A car-fault expert system has this rule base:
Accept: check starter motor | starter motor | check the starter motor
Feedback (correct): Right. Both conditions of R2 match the answers, so R2 fires.
Feedback (wrong): R1 needs dim lights and R3 needs the engine to start, so neither matches. R2 needs "will not start" AND "lights are bright": both true, so the conclusion is "check starter motor".

**8 · Quick check**
Which of these systems shows machine learning?
- A. A heating system that switches on whenever the room drops below 18 °C — *That is a fixed rule in an automated system; it never changes itself.*
- B. An expert system using car-fault rules typed in by mechanics — *Its rules stay the same until a person edits them.*
- C. ✓ A music app that changes its suggestions based on songs you skip — *Right: it adapts its own data and processes from new data.*
- D. A chat filter that blocks words from a fixed list set by staff — *A fixed list does not adapt unless staff change it.*

**9 · Mission check**
A spam filter blocks a scam it has never seen. How?
- A. A programmer wrote a rule for that exact email in advance — *Nobody had seen this email, so no one could write a rule for it.*
- B. ✓ It learned patterns from past emails and adapted — *Right: machine learning lets it adapt its own processes and data.*
- C. It found the email in a fixed list of every known scam — *A new scam cannot be on a fixed list yet.*
- D. Its inference engine used rules that experts typed in — *That describes an expert system; its fixed rules only catch tricks the experts already knew.*
Shown after answering: The filter uses machine learning. It was trained on many emails marked spam or not spam, found patterns, and keeps adapting its own processes and data as new emails arrive, so it can spot a new scam that shares those patterns.

### Recap

- Sensors measure and send data; the microprocessor compares the data with stored values and decides; actuators make the physical change.
- The loop repeats continuously, so the system reacts without a person.
- Advantages and disadvantages must be linked to the scenario given.
- Robotics is the branch of computer science covering the design, construction and operation of robots.
- A robot has a mechanical structure, electrical components (sensors, microprocessor, actuators) and is programmable.
- Robots work in industry, transport, agriculture, medicine, homes and entertainment; judge their pros and cons for the role given.
- AI simulates intelligent behaviour: data plus rules, the ability to reason, and sometimes the ability to learn and adapt.
- An expert system has a knowledge base, a rule base, an inference engine and an interface; its rules are fixed by people.
- Machine learning automatically adapts its own processes and/or data.

---

## Algorithm design and problem-solving  (Cambridge IGCSE Computer Science (0478/0984) · Topic 7)
Page: `computer-science-gcse-cambridge-igcse-algorithm-design-problem-solving-mini-lesson.html`

### Mission 1: Why does the Tube map ignore real distances, yet still work?  [module G1]

*Guess chips:* It keeps only what a traveller needs · Nobody could measure the real distances · It is to scale, just squashed · I'm not sure yet

**1 · Teach — Breaking a problem down**
> Diagram D1: Decomposition tree. Top box "Plan a Tube journey". Level 2: "Find nearest station", "Choose the route", "Work out journey time". Level 3 under "Choose the route": "Pick the lines", "Find where to change".
- **Decomposition** means breaking a problem into smaller **sub-problems**, each doing one identifiable task.
- Each sub-problem can be broken down again until it is simple to solve.
- Parts can be solved and tested separately, even by different people.
- "Plan a Tube journey" splits into: find the nearest station, choose the route, work out the time.
- Every computer system is made of **sub-systems**, made of further sub-systems.

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
- Also identify **storage**: data that must be kept, such as the price per hour.

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
- Cambridge exams use the pseudocode shown here; write precise conditions such as X > Y, not "X is greater than Y"
- This algorithm loops while the count is above 0. Each time round it doubles the result and counts down by 1.
```
DECLARE Count : INTEGER
DECLARE Result : INTEGER
Count ← 3
Result ← 1
WHILE Count > 0 DO
    Result ← Result * 2
    Count ← Count - 1
ENDWHILE
OUTPUT Result
```

**4 · Teach — Trace tables**
> Diagram D3: Trace table for screen 3's algorithm. Columns: count, result, Output. Rows: (3, 1, –), (2, 2, –), (1, 4, –), (0, 8, –), (–, –, 8).
- A **dry run** follows an algorithm by hand. A **trace table** records it: one column per variable, plus Output.
- Add a row when a value changes. For screen 3, count goes 3, 2, 1, 0 and result goes 1, 2, 4, 8.
- The pattern shows the **purpose**: it works out 2 to the power of the starting count.
- Also record any **user prompts** the algorithm outputs.

**5 · Calculate**
```
DECLARE Num : INTEGER
DECLARE Steps : INTEGER
Num ← 37
Steps ← 0
WHILE Num > 1 DO
    Num ← DIV(Num, 2)
    Steps ← Steps + 1
ENDWHILE
OUTPUT Steps
```

Dry-run this algorithm. What does it output?
Answer: 5  (accepted: [[5.0, 5.0]])
Feedback (correct): Yes. num goes 37, 18, 9, 4, 2, 1, and steps goes up once each time: 5.
Feedback (wrong): Integer division drops the remainder: 37 → 18 → 9 → 4 → 2 → 1. That is 5 passes of the loop, then num > 1 is false, so steps is 5.

**6 · Teach — Errors in algorithms**
- A **syntax error** breaks the language's rules, e.g. a missing ENDIF. The code will not run.
- A **logic error**: the code runs but gives a wrong result, e.g. > where ≥ was needed.
- To fix a logic error, dry-run with test data, find where the trace goes wrong, correct it and retest.

**7 · Quick check**
```
DECLARE Mark : INTEGER
INPUT Mark
IF Mark > 50
  THEN
    OUTPUT "Pass"
  ELSE
    OUTPUT "Fail"
ENDIF
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

### Mission 3: Why is it called a bubble sort?  [module G4a]

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
- the array Items is declared ARRAY[1:6], so Index runs from 1 to 5.
- A swap needs a temporary variable, temp, to hold one value.
- swapped records whether the pass changed anything. The outer loop repeats until a pass makes no swaps.
```
DECLARE Items : ARRAY[1:6] OF INTEGER
DECLARE Index : INTEGER
DECLARE Temp : INTEGER
DECLARE Swapped : BOOLEAN
REPEAT
    Swapped ← FALSE
    FOR Index ← 1 TO 5
        IF Items[Index] > Items[Index + 1]
          THEN
            Temp ← Items[Index]
            Items[Index] ← Items[Index + 1]
            Items[Index + 1] ← Temp
            Swapped ← TRUE
        ENDIF
    NEXT Index
UNTIL Swapped = FALSE
```

**6 · Quick check**
```
Items[Index] ← Items[Index + 1]
Items[Index + 1] ← Items[Index]
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

### Mission 4: How can a program average numbers if it doesn't know how many?  [module G5]

*Guess chips:* Keep a running total and a count · It must ask how many there are first · It can't: the amount must be fixed · I'm not sure yet

**1 · Teach — Totalling**
> Diagram D1: Trace table for screen 1's code with inputs 12, 7, 9, 15. Columns: {{C: Index, Mark, Total, OUTPUT
- **Totalling** keeps a running total. Set the total to 0 before the loop.
- Inside the loop, add each new value to the total.
- Forgetting to set the total to 0 first is a common error.
- With marks 12, 7, 9 and 15, the total goes 0 → 12 → 19 → 28 → 43.
```
DECLARE Total : INTEGER
DECLARE Index : INTEGER
DECLARE Mark : INTEGER
Total ← 0
FOR Index ← 1 TO 4
    INPUT Mark
    Total ← Total + Mark
NEXT Index
OUTPUT Total
```

**2 · Teach — Counting and the average**
- **Counting** adds 1 each time something happens. Set the count to 0 before the loop.
- If you do not know how many values are coming, loop until a value arrives that cannot be real data, such as −1 for a mark. This stop value is not added or counted.
- After the loop, **average** = total ÷ count. Check the count is above 0 first.
```
DECLARE Total : INTEGER
DECLARE Count : INTEGER
DECLARE Mark : INTEGER
Total ← 0
Count ← 0
INPUT Mark
WHILE Mark <> -1 DO
    Total ← Total + Mark
    Count ← Count + 1
    INPUT Mark
ENDWHILE
IF Count > 0
  THEN
    OUTPUT Total / Count
ENDIF
```

**3 · Calculate**
The program on screen 2 is given the inputs 14, 9, 20, 11, 6, −1. What does it output?
Answer: 12  (accepted: [[12.0, 12.0]])
Feedback (correct): Yes. Total = 60 and count = 5 (the −1 only stops the loop), so 60 ÷ 5 = 12.
Feedback (wrong): The loop adds 14 + 9 + 20 + 11 + 6 = 60 and counts 5 marks. The −1 ends the loop before it is added or counted, so the output is 60 ÷ 5 = 12.

**6 · Teach — Maximum and minimum**
- To find the **maximum**, set Max to the first value. Compare each value with Max and replace Max when a value is bigger.
- The **minimum** works the same way, replacing Min when a value is smaller.
- One loop can find the maximum, minimum and total; average = total ÷ number of values.
- For scores 18, 25, 21, 30, 16: maximum 30, minimum 16, average 22.
```
DECLARE Score : ARRAY[1:5] OF INTEGER
DECLARE Max : INTEGER
DECLARE Min : INTEGER
DECLARE Total : INTEGER
DECLARE Index : INTEGER
DECLARE Average : REAL
Max ← Score[1]
Min ← Score[1]
Total ← 0
FOR Index ← 1 TO 5
    IF Score[Index] > Max
      THEN
        Max ← Score[Index]
    ENDIF
    IF Score[Index] < Min
      THEN
        Min ← Score[Index]
    ENDIF
    Total ← Total + Score[Index]
NEXT Index
Average ← Total / 5
OUTPUT Max, Min, Average
```

**7 · Calculate**
```
DECLARE Temp : ARRAY[1:4] OF INTEGER
DECLARE Max : INTEGER
DECLARE Index : INTEGER
Max ← 0
FOR Index ← 1 TO 4
    IF Temp[Index] > Max
      THEN
        Max ← Temp[Index]
    ENDIF
NEXT Index
OUTPUT Max
```

This algorithm checks the temperatures −3, −7, −1, −5. What does it output?
Answer: 0  (accepted: [[0.0, 0.0]])
Feedback (correct): Yes, and that is a logic error: no temperature is above 0, so Max never changes. Setting Max ← Temp[1] first would give −1.
Feedback (wrong): Trace it: Max starts at 0. Is −3 > 0? No. −7, −1 and −5 are not bigger either, so Max stays 0 and 0 is output. The fix is to start with Max ← Temp[1].

**8 · Teach — Linear search**
- A **linear search** checks each item in turn, from the first, until it finds the target or reaches the end.
- The data can be in any order.
- A Boolean flag, Found, stops the loop as soon as the item is found.
```
DECLARE Names : ARRAY[1:5] OF STRING
DECLARE Found : BOOLEAN
DECLARE Index : INTEGER
DECLARE Target : STRING
Found ← FALSE
Index ← 1
INPUT Target
WHILE (Found = FALSE) AND (Index <= 5) DO
    IF Names[Index] = Target
      THEN
        Found ← TRUE
      ELSE
        Index ← Index + 1
    ENDIF
ENDWHILE
IF Found = TRUE
  THEN
    OUTPUT Target, " found at position ", Index
  ELSE
    OUTPUT Target, " not found"
ENDIF
```

**9 · Calculate**
The linear search on screen 8 runs with Names holding Kai, Ola, Ben, Zoe, Ann (Names[1] to Names[5]). The user inputs Ben. How many names does it compare with Target?
Answer: 3  (accepted: [[3.0, 3.0]])
Feedback (correct): Yes. Kai and Ola do not match; Ben does, so Found becomes TRUE and the loop stops after 3 comparisons.
Feedback (wrong): Trace it: Index 1, Kai ≠ Ben; Index 2, Ola ≠ Ben; Index 3, Ben = Ben, so Found ← TRUE and the loop ends. Zoe and Ann are never checked: 3 comparisons.

**10 · Teach — The program development life cycle**
> Diagram D2: Four-stage cycle: Analysis → Design → Coding → Testing, with one-line task labels under each (Analysis: "abstraction, decomposition, requirements"; Design: "structure diagrams, flowcharts, pseudocode"; Coding: "write code, iterative testing"; Testing: "test data").
- **Analysis**: abstraction and decomposition of the problem; identify the problem and its requirements.
- **Design**: decomposition, structure diagrams, flowcharts and pseudocode.
- **Coding**: write the program code, with **iterative testing** of each part as it is written.
- **Testing**: test the finished program with test data.

**11 · Mission check**
How can a program average numbers if it doesn't know how many?
- A. It asks the user how many numbers there are before it starts — *That works, but it is not needed: the program can count the values itself.*
- B. It adds the numbers and divides by the last number entered — *The last value is just data (or the stop value), not how many there were.*
- C. It cannot, because an average needs a fixed number of values — *The number of values can be found while they arrive, by counting.*
- D. ✓ It keeps a running total and a count, then divides — *Right: total ÷ count once the end-of-data value arrives.*
Shown after answering: Set a total and a count to 0. Each time a value arrives, add it to the total and add 1 to the count. When the end-of-data value arrives (such as −1 for marks), divide the total by the count.

### Mission 5: You typed 41, not 14, for your age. Why did the form accept it?  [module P6]

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
- **Type check**: the data is the right data type, e.g. a whole number.
- **Format check**: the data matches a set pattern, e.g. a date as DD/MM/YYYY.
- **Check digit**: the last digit of a code such as an ISBN or barcode, calculated from the other digits. On entry it is recalculated; a mismatch shows a mistyped digit.

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
DECLARE Score : INTEGER
OUTPUT "Score 1 to 10"
INPUT Score
WHILE Score < 1 OR Score > 10 DO
  OUTPUT "Must be 1 to 10"
  INPUT Score
ENDWHILE
```

**5 · Calculate**
```
DECLARE Name : STRING
INPUT Name
WHILE LENGTH(Name) < 3 DO
  OUTPUT "Too short"
  INPUT Name
ENDWHILE
OUTPUT "Hello ", Name
```

The user types three names in this order: an empty string, Al, then Amir. How many times is "Too short" output?
Answer: 2  (accepted: [[2.0, 2.0]])
Feedback (correct): Yes. The empty string (length 0) and Al (length 2) both fail; Amir (length 4) passes, so "Hello Amir" follows.
Feedback (wrong): Trace each input: empty string, length 0 < 3, "Too short"; Al, length 2 < 3, "Too short"; Amir, length 4, not < 3, so the loop ends. That is 2 messages. An empty string still has a length (0), so it fails the check too.

**6 · Teach — Verification**
> Diagram D2: Two boxes "Enter email" and "Re-enter email" with values that differ by one letter (sam@school.ac.uk vs sam@schol.ac.uk), arrow into "compare" → red cross "do not match". Beside it, a person icon comparing a paper form to the screen (visual check / proofreading).
- **Verification** checks that data was entered or copied accurately, so it matches the original.
- **Double entry check**: type the data twice; the computer compares the two and rejects a mismatch.
- **Visual check**: the user reads the data on screen and compares it with the original.
- Validation asks "is it sensible?"; verification asks "is it what was meant?". Typing 41 for 14 passes validation; comparing it with the original could catch it.

**9 · Mission check**
You typed 41, not 14, for your age. Why did the form accept it?
- A. The range check was broken, so it let every number through without testing it. — *The form rejected 150, so the range check was working.*
- B. A presence check passed first, so the program skipped all the other checks. — *Programs can run several checks; 41 would pass a range check too.*
- C. ✓ 41 is a sensible age, so it passes; validation can't tell if data is correct. — *Yes: validation only tests that data follows the rules, and 41 does.*
- D. Forms can only validate text, so numbers like ages are never checked at all. — *Range checks are made for numbers, and this form rejected 150.*
Shown after answering: Validation checks that data is reasonable, such as an age from 0 to 120. 41 follows that rule, so it is accepted even though it is wrong. A verification check, such as reading the entry back, is how mistakes like this are caught.

### Mission 6: It passed every test. So why did it fail for an 18-year-old?  [module P7]

*Guess chips:* 18 is an awkward number for computers · Nobody tested the exact edge, 18 · The computer made a random slip · I'm not sure yet

**1 · Teach — Why test?**
- **Testing** checks that a program works as intended and meets its requirements.
- It finds errors so they can be fixed before users meet them.
- A program can run without crashing and still give wrong results.
- Passing a few easy tests proves little: choose test data that could expose errors.

**2 · Teach — Normal, edge and wrong data**
> Diagram D1: A number line from −1 to 12 with the valid range 1 to 10 shaded green. Markers: 5 (normal), 1 and 10 at the limits, 0 and 11 just outside (red), 15 further out (red). A separate card labelled "ten" (text) off the line.
For a program that accepts whole numbers from 1 to 10:
- **Normal** data: sensible values that should be accepted, e.g. 5.
- **Extreme** data: the smallest and largest acceptable values, 1 and 10. **Boundary** data: each limit and the value just past it: 0 and 1, 10 and 11.
- **Abnormal** data: data that should be rejected, e.g. ten or 15.

**3 · Calculate**
```
DECLARE Age : INTEGER
INPUT Age
IF Age > 18
  THEN
    OUTPUT "Adult ticket"
  ELSE
    OUTPUT "Child ticket"
ENDIF
```

The rule is "adult ticket for 18 and over". Tests with ages 10, 30 and 50 all gave the right ticket. Which single age would show the error?
Answer: 18  (accepted: [[18.0, 18.0]])
Feedback (correct): Yes. 18 > 18 is False, so an 18-year-old gets a child ticket. The condition should be "age ≥ 18" (Age >= 18).
Feedback (wrong): Test the edge of the rule. For 17, both the rule and the code give a child ticket; for 19, both give an adult ticket. Only at 18 do they disagree: the rule says adult, but 18 > 18 is False, so the code says child.

**4 · Quick check**
A program accepts whole numbers from 1 to 10. A tester types the word ten. What type of test data is this?
- A. Normal data — *Ten means 10 to a person, but the program expects a number, so the word must be rejected.*
- B. Extreme data — *10 is at the edge of the range, but the word ten is not a number at all.*
- C. ✓ Abnormal data — *Correct: it should be rejected.*
- D. Not useful test data, as the program may just crash — *Finding out whether it crashes is exactly why you test with data that should be rejected.*

**8 · Teach — Code that is easy to maintain**
- Other people (and you, later) must be able to read and change code. This is **maintainability**.
- **Meaningful identifiers**: totalScore, not t.
- **Comments** explain what each part of the code does.
- **Procedures and functions** break code into named, reusable parts.

**9 · Mission check**
It passed every test. So why did it fail for an 18-year-old?
- A. ✓ No test used 18 itself, so the wrong comparison (> not ≥) went unseen. — *Yes: only a test at the edge of the rule shows the error.*
- B. Computers sometimes make random mistakes with even numbers like 18. — *Computers follow the code exactly; the same input always gives the same result.*
- C. Too few tests were run; 100 random ages would surely have found it. — *Random ages could easily miss 18; choosing the edge value matters more than how many tests.*
- D. 18 is outside the valid range, so a child ticket was the right output. — *18 is a valid age that should get an adult ticket; it sits exactly on the limit.*
Shown after answering: The code used > 18 when the rule needed ≥ 18, a mistake that only shows at exactly 18. Testing 10, 30 and 50 only tried normal values; a test at the edge of the range would have caught it.

### Recap

- **Decomposition** breaks a problem into sub-problems that can be solved separately.
- **Abstraction** removes unnecessary detail so a model keeps only what the task needs.
- Decompose a problem into **inputs, processes, outputs and storage**, and show it with a structure diagram.
- Flowcharts, pseudocode and program code are three ways to write the same algorithm.
- A **trace table** records each variable during a dry run; it reveals the output, the purpose and any logic error.
- Syntax errors stop code running; logic errors give wrong results.
- A bubble sort compares **adjacent pairs** and swaps any in the wrong order; one run through the list is a **pass**.
- After each pass, the largest unsorted item is in place; stop when a pass makes **no swaps**.
- It is simple and needs little memory, but it is slow for large lists.
- **Totalling**: start at 0, add each value inside the loop. **Counting**: start at 0, add 1 each time.
- Average = total ÷ count, worked out after the loop.
- Max and min start at the first value; a **linear search** checks items in turn; the PDLC is analysis, design, coding, testing.
- Validation automatically checks input is sensible, e.g. range, length and presence checks, and rejects data that breaks the rules; it cannot check data is correct.
- Verification checks data matches the original: double entry and visual checks.
- Choose test data of every kind: normal, at the edges of the range, and data that should be rejected (normal, extreme, boundary, abnormal).
- Meaningful names, comments, indentation and subprograms make code easy to maintain.

---

## Programming  (Cambridge IGCSE Computer Science (0478/0984) · Topic 8)
Page: `computer-science-gcse-cambridge-igcse-programming-mini-lesson.html`

### Mission 1: How does a game turn 135 seconds into 2:15 on its timer?  [module P1]

*Guess chips:* Divide by 60 to get 2.25, so 2:25 · Use whole-number division and the remainder · Round 135 ÷ 60 to the nearest minute · I'm not sure yet

**1 · Teach — Variables, constants, input and output**
> Diagram D1: Two labelled memory boxes. Box "lives" (variable, blue) shows value 3 crossed out and 2 written beside it with an arrow labelled "assignment". Box "MAX_LIVES" (constant, grey, small padlock icon) holds 3. Caption: "variable: value can change · constant: value fixed while running".
- A **variable** is a named memory location whose value can change while the program runs.
- A **constant** is a named value that cannot change while the program runs. Naming it means one place to update it, and clearer code.
- **Assignment** puts a value into a variable; the first assignment is **initialisation**. Use **meaningful identifiers** like `lives`, not `x`.
- Declare every variable with `DECLARE` and a data type.
```
CONSTANT MaxLives ← 3
DECLARE Lives : INTEGER
DECLARE PlayerName : STRING
Lives ← MaxLives
OUTPUT "Enter your name"
INPUT PlayerName
OUTPUT "Good luck, ", PlayerName
Lives ← Lives - 1
OUTPUT Lives
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
- Cambridge keywords: `INTEGER`, `REAL`, `CHAR`, `STRING`, `BOOLEAN`. A real is always written with a digit each side of the point, e.g. 4.0.

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
| Integer division | DIV(200, 60) | 3 |
| Remainder | MOD(200, 60) | 20 |
- In Cambridge pseudocode DIV and MOD are library routines written like functions, with integer values.
```
DECLARE Total : INTEGER
DECLARE Minutes : INTEGER
DECLARE Seconds : INTEGER
Total ← 200
Minutes ← DIV(Total, 60)    // 3
Seconds ← MOD(Total, 60)    // 20
```

**5 · Calculate**
```
DECLARE Boxes : INTEGER
DECLARE Spare : INTEGER
Boxes ← DIV(47, 6)
Spare ← MOD(47, 6)
```

A shop packs eggs in boxes of 6. It has 47 eggs. What value does the program store in `spare`?
Answer: 5  (accepted: [[5.0, 5.0]])
Feedback (correct): Yes. 6 goes into 47 seven whole times (42 eggs), leaving 5 spare.
Feedback (wrong): The remainder is what is left after whole boxes: 47 integer-divided by 6 is 7 boxes, 7 × 6 = 42, and 47 − 42 = 5. (7 is the integer division answer, and 7.83 is real division.)

**6 · Calculate**
```
Result ← 2 ^ 5
```

What value is stored in `result`?
Answer: 32  (accepted: [[32.0, 32.0]])
Feedback (correct): Right. The **exponent** operator raises to a power: 2 × 2 × 2 × 2 × 2 = 32.
Feedback (wrong): `^` means "to the power of", not multiply. 2 to the power 5 is 2 × 2 × 2 × 2 × 2 = 32 (2 × 5 = 10 is the common slip).

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
- Compare with `<`, `>`, `<=`, `>=`, equal to `=` and not equal to `<>`.
- Join conditions with **AND**, **OR**, **NOT**.
```
DECLARE Mark : INTEGER
Mark ← 72
IF Mark >= 70
  THEN
    OUTPUT "Distinction"
  ELSE
    IF Mark >= 40
      THEN
        OUTPUT "Pass"
      ELSE
        OUTPUT "Fail"
    ENDIF
ENDIF
```

**2 · Quick check**
```
DECLARE Temp : INTEGER
DECLARE Wind : INTEGER
Temp ← 18
Wind ← 35
IF Temp > 15 AND NOT (Wind > 30)
  THEN
    OUTPUT "Picnic"
  ELSE
    OUTPUT "Stay in"
ENDIF
```

What is output when this code runs?
- A. Picnic — *temp > 15 is true, but wind > 30 is also true, so NOT makes that part false and the AND fails.*
- B. ✓ Stay in — *Right: true AND NOT(true) is true AND false, which is false, so the ELSE block runs.*
- C. Picnic, then Stay in — *Selection runs only one branch: either the THEN block or the ELSE block, never both.*
- D. Nothing is output — *There is an ELSE block, so one of the two outputs always runs.*

**3 · Teach — CASE statements**
- A **CASE** statement picks one branch by comparing one variable with a list of values.
- Cases are checked in order; the first match runs, then the statement ends.
- `OTHERWISE` runs if no case matches.
- It is neater than a long chain of IFs when you test one variable for exact values.
```
DECLARE Day : STRING
INPUT Day
CASE OF Day
  "Sat" : OUTPUT "Weekend"
  "Sun" : OUTPUT "Weekend"
  OTHERWISE OUTPUT "Weekday"
ENDCASE
```

**4 · Teach — Count-controlled loops**
- **Iteration** repeats a block of code.
- A **count-controlled** loop repeats a fixed number of times. A counter variable goes up by 1 each time unless a step is given.
```
DECLARE Count : INTEGER
FOR Count ← 1 TO 5
    OUTPUT Count * 3
NEXT Count
```
All output 3, 6, 9, 12, 15.

**5 · Teach — Condition-controlled loops**
- A **condition-controlled** loop repeats until a condition changes, so you need not know the number of passes.
- A pre-condition (WHILE) loop tests the condition **at the start**: it may run zero times.
- A post-condition loop, `REPEAT … UNTIL`, tests **at the end**, so it always runs at least once.
```
DECLARE Total : INTEGER
Total ← 1
WHILE Total < 50 DO
    Total ← Total * 2
ENDWHILE
OUTPUT Total
```
All output 64.

**6 · Answer**
```
DECLARE N : INTEGER
N ← 3
WHILE N < 40 DO
    N ← N * 2
ENDWHILE
OUTPUT N
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
- You write at most three levels of nesting.
```
DECLARE Row : INTEGER
DECLARE Col : INTEGER
FOR Row ← 1 TO 3
    FOR Col ← 1 TO 3
        OUTPUT Row * Col
    NEXT Col
NEXT Row
```
Output: 1, 2, 3, 2, 4, 6, 3, 6, 9 (9 values).

**8 · Calculate**
```
DECLARE I : INTEGER
DECLARE J : INTEGER
FOR I ← 1 TO 4
    FOR J ← 1 TO 6
        OUTPUT I + J
    NEXT J
NEXT I
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
- An **index** picks out one element. Bounds are declared, e.g. `ARRAY[1:5]`; the first index is usually **1**.
```
DECLARE Scores : ARRAY[1:5] OF INTEGER
Scores[1] ← 12
Scores[2] ← 7
Scores[3] ← 9
Scores[4] ← 15
Scores[5] ← 4
OUTPUT Scores[2]      // 7
Scores[4] ← 20        // 15 becomes 20
```

**2 · Teach — Looping through an array**
- Use a **variable as the index** in a count-controlled loop to visit every element in turn.
- The counter runs from the lower bound to the upper bound.
```
DECLARE Temps : ARRAY[1:5] OF INTEGER
DECLARE Total : INTEGER
DECLARE Index : INTEGER
// Temps holds 18, 21, 17, 22, 19
Total ← 0
FOR Index ← 1 TO 5
    Total ← Total + Temps[Index]
NEXT Index
OUTPUT Total
```
All output 97.

**3 · Answer**
```
DECLARE Nums : ARRAY[1:5] OF INTEGER
DECLARE Index : INTEGER
FOR Index ← 1 TO 5
    Nums[Index] ← Index * 3
NEXT Index
OUTPUT Nums[2] + Nums[4]
```

What is output when this code runs?
Accept: 18
Feedback (correct): Yes. Element 2 holds 6 and element 4 holds 12, so the output is 18.
Feedback (wrong): The loop fills Nums with 3, 6, 9, 12, 15 at indexes 1 to 5. So Nums[2] is 6 and Nums[4] is 12: 6 + 12 = 18. If you got 24, you counted from index 0 instead of 1.

**4 · Teach — 2D arrays**
> Diagram D2: A 3 × 3 noughts and crosses grid; X in the centre, O bottom-left, others empty. Row labels down the left, column labels along the top, and a callout on the centre: A E "board[1][1]"; O Q I "board[1,1]"; C "Board[2,2]".
- A **two-dimensional (2D) array** is like a table: one identifier, with **rows** and **columns**.
- Each element needs **two indexes**: `Board[Row, Column]` (row first here).
- A noughts and crosses board is a 3 × 3 2D array of characters.
```
DECLARE Board : ARRAY[1:3, 1:3] OF CHAR
Board[2,2] ← 'X'     // centre square
Board[3,1] ← 'O'     // bottom-left square
```

**5 · Quick check**
| 5 | 8 | 2 | 9 |
| 7 | 1 | 6 | 3 |
| 4 | 10 | 11 | 0 |

`Marks` is declared as `ARRAY[1:3, 1:4] OF INTEGER` and holds the values in this table (row first). What is `Marks[2,3]`?
- A. 0 — *That treats the indexes as starting at 0, but these bounds start at 1, so row 2 is the second row.*
- B. ✓ 6 — *Right: row 2 is the second row and column 3 is its third value, 6.*
- C. 10 — *That is row 3, column 2: you swapped the row and column indexes.*
- D. 11 — *That is row 3, column 3: the row index is 2, which is the second row, not the third.*

**6 · Answer**
```
DECLARE Grid : ARRAY[1:3, 1:4] OF INTEGER
DECLARE Row : INTEGER
DECLARE Column : INTEGER
FOR Row ← 1 TO 3
    FOR Column ← 1 TO 4
        Grid[Row, Column] ← Row * 10 + Column
    NEXT Column
NEXT Row
OUTPUT Grid[2, 3] + Grid[3, 1]
```

Nested loops visit every element of a 2D array: the outer loop picks a row, the inner loop each column in that row. What is output?
Accept: 54
Feedback (correct): Yes. Every element gets Row × 10 + Column, so Grid[2, 3] is 23 and Grid[3, 1] is 31: 23 + 31 = 54.
Feedback (wrong): The nested loops fill all 12 elements with Row × 10 + Column. Grid[2, 3] is row 2, column 3: 2 × 10 + 3 = 23. Grid[3, 1] is 3 × 10 + 1 = 31. So 23 + 31 = 54. (45 means you swapped rows and columns: 32 + 13.)

**11 · Mission check**
How can one name hold all 9 squares of a noughts and crosses board?
- A. A Boolean, as each square is either filled or empty — *A Boolean holds one value only, and a square has three states: X, O or empty.*
- B. A constant, as the board always has nine squares — *A constant cannot change while the program runs, but the squares change every turn.*
- C. A 1D array with one element for the whole board — *One element holds one value, so it cannot store nine squares.*
- D. ✓ A 2D array of 3 rows and 3 columns — *Right: one identifier holds all nine squares, each found by its row and column index.*
Shown after answering: Store the board as a 2D array: one identifier, 3 rows × 3 columns, so 9 elements of the same data type. Each square is reached with two indexes, row then column, counting from the lower bound, usually 1.

### Mission 4: Two subroutines both use a variable called total. Why no clash?  [module P4]

*Guess chips:* The second one overwrites the first · Each one only exists inside its own subroutine · The computer quietly renames one · I'm not sure yet

**1 · Teach — Subroutines**
> Diagram D1: Two columns: "main program" on the left with lines `welcome()` / `welcome()` (C/Q: `CALL Welcome` / `call Welcome`); the procedure box on the right. Blue arrow from each call to the top of the procedure, orange arrow from the end of the procedure back to the line after that call. Numbered 1–4 to show order.
- A **subroutine** is a named, out-of-line block of code. It runs when you **call** it by its name, then control returns to the line after the call.
- A **procedure** carries out a task. A **function** carries out a task and **returns a value**.
```
PROCEDURE Welcome
    OUTPUT "Welcome to the quiz"
ENDPROCEDURE

CALL Welcome
CALL Welcome
```

**2 · Teach — Parameters and return values**
- A **parameter** passes data into a subroutine when it is called. Values are matched to parameters **in order**.
- A function sends its result back with **return**. The returned value replaces the call, so store it or use it straight away.
- Give each parameter a data type, and the function a `RETURNS` type. There are up to three parameters. Procedures are called with `CALL`; functions are used inside an expression.
```
FUNCTION Area(Width : INTEGER, Height : INTEGER) RETURNS INTEGER
    DECLARE Result : INTEGER
    Result ← Width * Height
    RETURN Result
ENDFUNCTION

DECLARE RoomArea : INTEGER
RoomArea ← Area(4, 5)
OUTPUT RoomArea    // 20
```

**3 · Answer**
```
FUNCTION Change(Paid : INTEGER, Price : INTEGER) RETURNS INTEGER
    RETURN Paid - Price
ENDFUNCTION

OUTPUT Change(20, 13) * 2
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
- A variable `DECLARE`d inside a subroutine is local; one declared in the main program is global.
```
FUNCTION AddBonus(Score : INTEGER) RETURNS INTEGER
    DECLARE NewScore : INTEGER    // local
    NewScore ← Score + Bonus
    RETURN NewScore
ENDFUNCTION

DECLARE Bonus : INTEGER           // global
Bonus ← 5
OUTPUT AddBonus(10)               // 15
OUTPUT NewScore                   // error: NewScore does not exist here
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
- **Library routines** are ready-made subroutines, e.g. `ROUND`, `RANDOM`, `DIV`, `MOD`.

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
- Cambridge usually counts the first character as position 1, but a question may use 0, so check.
- The **length** of a string is how many characters it holds, spaces included.
- A card number is stored as a string, not an integer: it is never used in arithmetic.
```
DECLARE Card : STRING
Card ← "4929123456789012"
OUTPUT LENGTH(Card)
// outputs 16
```

**2 · Teach — Taking a substring**
> Diagram D2: Same 16-box row; the last four boxes lifted out into a new row with "****" in front, forming ****9012. An arrow from "length − 4" to the first lifted box.
- A **substring** is part of a string, picked out by position.
- SUBSTRING(string, start, length) takes length characters from position start.
- Using the length makes the code work for any card length.
```
DECLARE Card : STRING
DECLARE Last4 : STRING
Card ← "4929123456789012"
Last4 ← SUBSTRING(Card, LENGTH(Card) - 3, 4)
OUTPUT "****", Last4
```

**3 · Answer**
```
DECLARE Word : STRING
Word ← "computer"
OUTPUT SUBSTRING(Word, 4, 3)
```

Trace this code. What is output?
Accept: put
Feedback (correct): Yes. Counting from position 1, c-o-m-p gives position 4 = p, then u and t.
Feedback (wrong): Write the indices under the letters first. c=1, o=2, m=3, p=4. Start at position 4 and take 3 characters: "put".

**4 · Teach — More string tools**
- UCASE("Happy") gives "HAPPY"; LCASE('W') gives 'w'.
- Use these to compare text whatever case it was typed in.

**5 · Teach — Random numbers**
- Games, quizzes and simulations need unpredictable values, such as a dice roll.
- RANDOM() gives a number from 0 to 1, so multiply, round and add to get the range you need.
```
DECLARE Dice : INTEGER
Dice ← ROUND(RANDOM() * 5, 0) + 1
OUTPUT Dice
```

**6 · Calculate**
```
OUTPUT ROUND(RANDOM() * 4, 0) + 5
```

How many different values can this code output?
Answer: 5  (accepted: [[5.0, 5.0]])
Feedback (correct): Right: 5, 6, 7, 8 and 9. Both ends of the range are included.
Feedback (wrong): List them: 5, 6, 7, 8, 9. That is 5 values, not 9 − 5 = 4, because both ends are included. RANDOM() * 4 runs from 0 to 4; rounding gives 0 to 4; adding 5 gives 5 to 9.

**7 · Teach — Reading and writing files**
> Diagram D3: Flow: program box → "open" → file icon "scores.txt" with lines "Ann,35", "Ben,28", "Zara,42" → "read / write" arrows → "close". A dashed RAM box with a variable that empties when the program ends, beside the file that keeps its contents.
- Variables are lost when a program ends. A **file** in secondary storage keeps data, such as high scores, for next time.
- **Open** the file, **read** or **write** it, then **close** it so the data is saved and the file is freed.
- Open a file FOR READ or FOR WRITE; WRITE creates a new file, so any existing data is lost.
```
DECLARE Line : STRING
Line ← "Zara,42"
OPENFILE "Scores.txt" FOR WRITE
WRITEFILE "Scores.txt", Line
CLOSEFILE "Scores.txt"
OPENFILE "Scores.txt" FOR READ
READFILE "Scores.txt", Line
OUTPUT Line
CLOSEFILE "Scores.txt"
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

### Recap

- A variable is a named memory location whose value can change; a constant keeps one value while the program runs.
- Choose the data type that fits the data: integer, real, Boolean, character or string.
- Integer division gives the whole-number part; the remainder (modulus) gives what is left over.
- Sequence runs statements in order; selection uses a true/false condition to choose a branch (IF or CASE).
- Count-controlled loops repeat a fixed number of times; condition-controlled loops repeat until a condition changes, tested at the start or the end.
- In nested loops the inner loop runs fully for every pass of the outer loop.
- An array holds many values of one data type under one identifier; an index picks out an element (from the declared lower bound, usually 1).
- A 2D array is a table of rows and columns, so each element needs two indexes.
- A subroutine is a named block of code called by its name; a function returns a value and a procedure does not.
- Parameters pass data in, in order; return passes a result back to the call.
- Local variables exist only inside their subroutine while it runs, so the same name can be reused safely; global variables can be used anywhere.
- A string is a sequence of characters, each with an index; the length is how many characters it has. Positions usually start at 1.
- A substring picks out part of a string by position.
- Files keep data after a program ends: open, read or write, close.
- Random number functions give a value in a range, including both ends.

---

## Databases  (Cambridge IGCSE Computer Science (0478/0984) · Topic 9)
Page: `computer-science-gcse-cambridge-igcse-databases-mini-lesson.html`

### Mission 1: Two students called Amy Khan: how does a database tell them apart?  [module B1]

*Guess chips:* By their names and forms · Each record has its own unique ID · By the order they were added · I'm not sure yet

**1 · Teach — Tables, records and fields**
> Diagram D1: The Student table exactly as on screen 1 (4 records, 5 fields). One row outlined and labelled "record", one column outlined and labelled "field", the whole grid labelled "table: Student". The two Amy Khan rows have a soft highlight on FirstName and Surname only.
- A **database** is an organised, persistent store of data.
- A **table** holds data about one kind of thing, such as students.
- A **record** is one row: all the data about one student.
- A **field** is one column: one item of data stored for every record, such as Surname.
- Your databases have a single table: one table holds one set of data.
| StudentID | FirstName | Surname | Form | DateOfBirth |
|---|---|---|---|---|
| S1041 | Amy | Khan | 10B | 14/03/2011 |
| S1042 | Leo | Grant | 10A | 02/09/2010 |
| S1057 | Amy | Khan | 10C | 21/06/2011 |
| S1063 | Priya | Shah | 10B | 30/11/2010 |

**2 · Calculate**
Look at the Student table on the previous screen. How many fields does each record have?
Answer: 5  (accepted: [[5.0, 5.0]])
Feedback (correct): Yes: StudentID, FirstName, Surname, Form and DateOfBirth. The table has 4 records, each with 5 fields.
Feedback (wrong): Fields are the columns, not the rows. Count the column headings: StudentID, FirstName, Surname, Form, DateOfBirth = 5. (There are 4 rows, which are the records.)

**3 · Teach — The primary key**
- A **primary key** is a field that holds a different value for every record, so it **uniquely identifies** each record.
- Names, forms and even birthdays can repeat, so they cannot be keys.
- Schools, shops and banks add an ID field, such as StudentID, to act as the key.
- The database refuses a new record whose key value is already used.

**4 · Quick check**
A Car table has the fields Make, Model, Colour and Registration. Which field is the most suitable primary key?
- A. Make, because every car has one — *Every car has a make, but many cars share the same make, so it is not unique.*
- B. Model, because it is the most detailed field — *Thousands of cars share a model, so it cannot identify one car.*
- C. ✓ Registration, because no two cars share one — *Correct: each registration number is unique, so it identifies exactly one record.*
- D. Colour, because it is the first thing you notice — *Many cars are the same colour, so colour cannot pick out a single record.*

**5 · Teach — Choosing data types**
> Diagram D2: A field-design card: Field name / Example / Data type. Rows: StudentID / S1041 / {A: string; C: text/alphanumeric}; Siblings / 2 / integer; Height / 1.62 / real; PaidTrip / True / Boolean; Initial / A / character; {C only: DateOfBirth / 14/03/2011 / date/time}.
- Each field has a **data type** that fits the data it stores.
- Integer for whole numbers, real for decimals, Boolean for TRUE/FALSE, character for one character, text/alphanumeric for text, date/time for dates and times.
- Phone numbers and IDs are stored as text/alphanumeric: they are not used in calculations, can start with 0 and can contain letters or spaces.
- When you define a table, add **validation** to fields, e.g. a range check on a Mark field or a presence check on Surname.

**6 · Quick check**
Which data type is most suitable for a field storing phone numbers such as 07700 900123?
- A. Integer, because phone numbers are made of digits — *An integer would drop the leading 0 and cannot hold the space.*
- B. ✓ Text/alphanumeric, as it is never used in sums — *Correct: it keeps the leading 0 and the space, and no arithmetic is needed.*
- C. Real, because the number is too long to be an integer — *Real is for numbers with a decimal part; a phone number has none and needs its leading 0.*
- D. Boolean, because each phone either has a number or not — *Boolean stores only True or False, not the number itself.*

**9 · Mission check**
Two students called Amy Khan: how does a database tell them apart?
- A. It compares their names and forms, which are always different — *Names repeat, and two students could even share a form, so these are not guaranteed unique.*
- B. ✓ Each record has a primary key, such as StudentID, that never repeats — *Yes: the key value identifies exactly one record.*
- C. It uses the order in which the two records were added to the table — *Records can be sorted or deleted, so position is not a reliable way to identify one.*
- D. It asks the user to pick one, as databases cannot tell records apart — *Databases identify records exactly by their primary key; no guess is needed.*
Shown after answering: Each record has a primary key field, such as StudentID, whose value is different in every record. The two Amy Khans have different StudentIDs (S1041 and S1057), so the database changes exactly the right record.

### Mission 2: How can one line of SQL find every overdue book in a library?  [module B2]

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
- Join conditions with **AND** (both must be true) or **OR** (either can be true): WHERE Genre = 'Fantasy' AND DaysLate > 0 returns Skellig and Matilda.
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
- **ORDER BY** sorts the results by a field: **ASC** (ascending, A to Z, smallest first) or **DESC** (descending, largest first).
- **SUM**(field) adds up a numeric field; **COUNT**(field) counts the records returned.
```
SELECT Title, DaysLate
FROM Loan
WHERE Genre = 'Fantasy'
ORDER BY DaysLate DESC

SELECT SUM(DaysLate)
FROM Loan
WHERE Genre = 'Fantasy'
```
The first returns Skellig 7, Matilda 5, Coraline 0. The second returns 12.

**5 · Calculate**
```
SELECT SUM(DaysLate)
FROM Loan
WHERE Genre = 'Drama' OR Genre = 'Fantasy'
```

Use the Loan table. What value does this query return?
Answer: 15  (accepted: [[15.0, 15.0]])
Feedback (correct): Yes. Wonder 3 + Coraline 0 + Skellig 7 + Matilda 5 = 15.
Feedback (wrong): OR keeps records that are Drama or Fantasy: L02 (3), L03 (0), L04 (7), L06 (5). SUM adds their DaysLate: 3 + 0 + 7 + 5 = 15. (COUNT would give 4, the number of records; AND would match no record, as no book is both genres.)

**8 · Mission check**
How can one line of SQL find every overdue book in a library?
- A. It loops through the records, one line of SQL per book in the table — *SQL describes what you want; one query searches every record, however many there are.*
- B. It sorts all the books by DaysLate and then reads off the top few — *Sorting alone cannot know where "late" stops; a condition is still needed.*
- C. It returns the whole table, and the librarian then picks out the late ones — *That is what SQL avoids: WHERE does the picking.*
- D. ✓ SELECT names the fields, FROM the table, and WHERE keeps only late books — *Yes: WHERE DaysLate > 0 returns just the overdue records.*
Shown after answering: SELECT Title FROM Loan WHERE DaysLate > 0. SELECT chooses the fields to show, FROM names the table, and WHERE keeps only the records that meet the condition, however many records the table holds.

### Recap

- A table stores records (rows); each record has the same fields (columns), each with a suitable data type.
- A primary key uniquely identifies each record.
- SELECT fields FROM table WHERE condition: the fields to show, the table to search and the records to keep.
- ORDER BY … ASC or DESC sorts the results.
- SUM adds up and COUNT counts; AND and OR combine conditions.

---

## Boolean logic  (Cambridge IGCSE Computer Science (0478/0984) · Topic 10)
Page: `computer-science-gcse-cambridge-igcse-boolean-logic-mini-lesson.html`

### Mission 1: "Tea or coffee?" Would a computer's OR let you have both?  [module L1]

*Guess chips:* Yes, OR allows both · No, OR means only one · Only if you use AND instead · I'm not sure yet

**1 · Teach — 1 or 0, and NOT**
> Diagram D1: NOT truth table: columns A, NOT A; rows 0→1, 1→0. Input column in grey, output column in teal. Column header per board: A Q "A̅" (overbar) with "NOT A" beneath; O "NOT A" (with "¬A" small beneath); E C I "NOT A".
- A **Boolean** value has only two states: 1 (TRUE) or 0 (FALSE).
- A **truth table** lists every possible combination of inputs with the output for each.
- **NOT** has one input and reverses it: NOT 0 = 1, NOT 1 = 0.
- Write it as NOT A.

**2 · Teach — AND**
> Diagram D2: Truth tables in the order 00, 01, 10, 11. Screen 2: AND (0,0,0,1); screen 3: OR (0,1,1,1); screen 5: XOR (0,1,1,0). Output cells that are 1 highlighted in teal. Header per board: A Q "A.B", "A + B", "A ⊕ B"; O "A AND B" / "A OR B" (∧/∨ small beneath); E C I words; C "A XOR B".
- **AND** has two inputs. The output is 1 only when **both** inputs are 1.
- If either input is 0, the output is 0.
- Write it as A AND B.
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
- Write it as A OR B.
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

**5 · Teach — XOR**
> Diagram D2: Truth tables in the order 00, 01, 10, 11. Screen 2: AND (0,0,0,1); screen 3: OR (0,1,1,1); screen 5: XOR (0,1,1,0). Output cells that are 1 highlighted in teal. Header per board: A Q "A.B", "A + B", "A ⊕ B"; O "A AND B" / "A OR B" (∧/∨ small beneath); E C I words; C "A XOR B".
- **XOR** (exclusive OR) has two inputs. The output is 1 when the inputs are **different**.
- If both inputs are the same (both 0 or both 1), the output is 0.
- Cambridge also calls it **EOR**.
- Write it as A XOR B.
| A | B | A XOR B |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

**6 · Quick check**
A hall light has a switch at each end. Flipping either switch changes the light, whatever the other switch is set to. Which operator gives this behaviour?
- A. AND — *AND only changes when the other switch is 1; with the other switch at 0, flipping does nothing.*
- B. OR — *With one switch at 1, OR stays 1 whatever you do to the other switch, so the light would not change.*
- C. NOT — *NOT has only one input, so it cannot combine two switches.*
- D. ✓ XOR — *Correct. XOR gives 1 when the switches differ, so flipping either one always flips the output.*

**7 · Teach — Logic gate symbols**
> Diagram D3: Gate symbols (ANSI distinctive shape), each labelled with its name and a mini truth table beside it: AND (D shape), OR (shield shape), NOT (triangle + bubble). For A and C only, add XOR (OR shape with an extra curved line at the input side). O version: AND, OR, NOT only. Inputs labelled A, B on the left; output Q on the right.
- A **logic gate** is a circuit that carries out one logical operator.
- **AND**: flat back, rounded front, two inputs.
- **OR**: curved back, pointed front, two inputs.
- **NOT**: a triangle with a small circle at the output. The circle means "reverse".
- **XOR**: the OR shape with an extra curved line behind the inputs.
- Inputs enter on the left; the output leaves on the right.

**8 · Quick check**
A cash machine gives out money only if the card is valid (V) and the PIN is correct (P). Which logic statement matches?
- A. V OR P — *OR would pay out with a valid card and the wrong PIN, because only one input needs to be 1.*
- B. NOT V AND P — *NOT V means the card is **not** valid, so this pays out for invalid cards.*
- C. ✓ V AND P — *Correct. AND gives 1 only when both conditions are 1.*
- D. V OR NOT P — *This pays out whenever the PIN is wrong, which is the opposite of what is needed.*

**9 · Mission check**
"Tea or coffee?" A customer ticks both, so Tea = 1 and Coffee = 1. What does Tea OR Coffee give?
- A. 0, because OR means one or the other but not both — *That is everyday "or". The "not both" rule is XOR, not OR.*
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
- XOR combines in the same way: NOT (1 XOR 0) = NOT 1 = 0

**2 · Teach — Every combination of three inputs**
> Diagram D1: Three stacked mini tables: 1 input (0,1), 2 inputs (00–11), 3 inputs (000–111), with a "×2" arrow between each. Input bits counted in binary order; the rightmost column alternates 0,1; the middle column in pairs; the left column in fours (shade the groups lightly).
- Each input can be 0 or 1, so each new input **doubles** the number of rows.
- 1 input: 2 rows. 2 inputs: 4 rows. 3 inputs: 8 rows.
- Fill the input columns by **counting up in binary** from 000 to 111. Then no row is missed or repeated.
- Exam questions use up to three inputs.

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
- Draw the statement as given, without simplifying. Every gate except NOT has two inputs.

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

### Mission 3: NAND flash is named after a logic gate. What does that gate do?  [module Lx]

*Guess chips:* Outputs 0 only if both inputs are 1 · Outputs 1 only if both inputs are 0 · Outputs 1 if the inputs differ · I'm not sure yet

**1 · Teach — NAND**
> Diagram D1: Screen 1: AND symbol beside NAND symbol, with the NAND bubble highlighted in orange and an arrow labelled "bubble = NOT". Truth table beside it. Screen 2: same for OR and NOR. ANSI distinctive shapes as in the Cambridge syllabus "Logic gate symbols" page.
- **NAND** means NOT AND: an AND gate followed by NOT.
- The output is 0 only when **both** inputs are 1. Otherwise it is 1.
- Symbol: the AND shape with a small circle (bubble) on the output.
- Write it as A NAND B, which equals NOT (A AND B).
| A | B | A AND B | A NAND B |
|---|---|---|---|
| 0 | 0 | 0 | 1 |
| 0 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 0 |

**2 · Teach — NOR**
> Diagram D1: Screen 1: AND symbol beside NAND symbol, with the NAND bubble highlighted in orange and an arrow labelled "bubble = NOT". Truth table beside it. Screen 2: same for OR and NOR. ANSI distinctive shapes as in the Cambridge syllabus "Logic gate symbols" page.
- **NOR** means NOT OR: an OR gate followed by NOT.
- The output is 1 only when **both** inputs are 0. Otherwise it is 0.
- Symbol: the OR shape with a small circle on the output.
- Write it as A NOR B, which equals NOT (A OR B).
| A | B | A OR B | A NOR B |
|---|---|---|---|
| 0 | 0 | 0 | 1 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 1 | 0 |

**3 · Quick check**
A gate's output column, for inputs 00, 01, 10, 11, is 1, 0, 0, 0. Which gate is it?
- A. NAND — *NAND gives 1, 1, 1, 0: it is 0 only when both inputs are 1.*
- B. ✓ NOR — *Correct. NOR is 1 only when both inputs are 0, the reverse of OR's 0, 1, 1, 1.*
- C. AND — *AND gives 0, 0, 0, 1: the 1 is on the last row, not the first.*
- D. XOR — *XOR gives 0, 1, 1, 0: it is 1 when the inputs differ.*

**4 · Teach — All six gates side by side**
> Diagram D2: Grid of six gate symbols (NOT, AND, OR, NAND, NOR, XOR) each with its mini truth table; pairs AND/NAND and OR/NOR placed side by side. Output 1s in teal.
- A bubble on the output **reverses** the column: NAND is AND reversed, NOR is OR reversed.
- AND 0001 · NAND 1110 · OR 0111 · NOR 1000 · XOR 0110 (inputs 00, 01, 10, 11).
- NOT is the only gate with one input. All the others have exactly two.
- To spot a gate from its column, count the 1s and see which rows they are on.

**5 · Answer**
X = (A NAND B) NOR C. Complete the output column for the rows 000, 001, 010, 011, 100, 101, 110, 111 (in that order). Type the 8 bits.
Accept: 00000010 | 0000 0010
Feedback (correct): Right. A NAND B is 1 on every row except A = 1, B = 1. NOR gives 1 only when both its inputs are 0, so X = 1 only on row 110.
Feedback (wrong): Work out A NAND B: 1,1,1,1,1,1,0,0. NOR gives 1 only when both its inputs are 0. A NAND B is 0 only on rows 110 and 111, and C is 0 only on 110. So X is 1 only on row 110: 00000010.

**6 · Teach — From a truth table to an expression**
- Find each row where the output is **1**.
- For each such row, AND the inputs, with NOT on any input that is 0.
- Join the row terms with **OR**.
- Example: X = 1 on rows 01 and 10 gives X = (NOT A AND B) OR (A AND NOT B). That is XOR.
- For a circuit, draw one 2-input gate per operator, without simplifying.

**7 · Quick check**
A truth table with inputs A, B, C has X = 1 only on rows 001 and 110. Which expression matches it?
- A. (A AND B AND C) OR (NOT A AND NOT B AND NOT C) — *These terms pick out rows 111 and 000, not 001 and 110.*
- B. (A AND B AND NOT C) AND (NOT A AND NOT B AND C) — *The row terms must be joined with OR. Joined with AND, X would never be 1.*
- C. (NOT A AND NOT B AND C) OR (A AND B) — *A AND B is also 1 on row 111, so this gives X = 1 on three rows.*
- D. ✓ (NOT A AND NOT B AND C) OR (A AND B AND NOT C) — *Correct. One AND term for each row where X = 1, joined with OR.*

**8 · Mission check**
NAND flash memory is named after the NAND gate. What does a NAND gate do?
- A. Outputs 1 only when both inputs are 1 — *That is AND. NAND is the reverse of AND.*
- B. Outputs 1 only when both inputs are 0 — *That is NOR, the reverse of OR.*
- C. ✓ Outputs 0 only when both inputs are 1 — *Correct. NAND is NOT AND: its column is 1, 1, 1, 0.*
- D. Outputs 1 only when the two inputs differ — *That is XOR. NAND also gives 1 when both inputs are 0.*
Shown after answering: A NAND gate is an AND gate followed by NOT. It outputs 0 only when both inputs are 1, and 1 for every other input.

### Recap

- Every input and output is 1 (TRUE) or 0 (FALSE). A truth table lists every combination of inputs.
- AND: 1 only if both inputs are 1. OR: 1 if at least one input is 1. NOT: reverses its one input.
- XOR: 1 only when the two inputs are different.
- Work out brackets first; NOT applies only to what comes straight after it.
- 3 inputs give 8 rows: count in binary from 000 to 111, and add working columns for each part.
- Turn a problem into a statement by giving each condition a letter and mapping "and", "or", "not".
- In a circuit, each gate's output feeds the next gate; read it from inputs to output.
- NAND = NOT AND (column 1110). NOR = NOT OR (column 1000). The bubble means NOT.
- To write an expression from a truth table, AND the inputs for each row that outputs 1, then OR the row terms together.

---
