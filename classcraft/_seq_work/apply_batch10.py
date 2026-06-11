# Batch 10: author "sequence" for CS + French specs.
# Run from classcraft/ root: python3 _seq_work/apply_batch10.py
import json, os, sys

S = {}
def seq(stem, *pairs):
    S[stem] = [{"term": t, "def": d} for (t, d) in pairs]

P_CS = "computer-science-"
P_FR = "french-"

# ============ COMPUTER SCIENCE — A-LEVEL ============

seq(P_CS+"a-level-ai--machine-learning-adventure-1",
 ("Collect the dataset", "Gather raw examples first — a model can only learn from existing data"),
 ("Clean and prepare the data", "Errors removed and values normalised before any training"),
 ("Split into training and test sets", "Unseen data reserved now so later evaluation is fair"),
 ("Train the model", "The algorithm adjusts weights using only the training set"),
 ("Evaluate on the test set", "Accuracy measured on unseen data after training completes"),
 ("Deploy the model", "Only a tested model is released to make real predictions"))

seq(P_CS+"a-level-algorithms--data-structures-adventure-1",
 ("Start with a sorted array", "Binary search's precondition — order the data first"),
 ("Examine the middle element", "Index (low+high) DIV 2 is checked before anything else"),
 ("Compare midpoint with the target", "This comparison decides which half is impossible"),
 ("Discard the half that cannot contain it", "The search space halves after the comparison"),
 ("Repeat on the remaining half", "Keep halving — log n steps at most"),
 ("Interval empty or item found — stop", "Termination is the final state of the search"))

seq(P_CS+"a-level-aqa-big-data-adventure-1",
 ("Data captured from many sources", "Sensors, transactions and feeds generate the raw input first"),
 ("Stored across distributed machines", "Volume is too big for one server, so it is spread out"),
 ("Map stage processes chunks in parallel", "Each machine works on its own portion of the data"),
 ("Reduce stage combines partial results", "Outputs of all the maps are merged into one answer"),
 ("Results analysed and visualised", "Patterns extracted from the combined output"),
 ("Insights inform decisions", "Findings are only used after the analysis is complete"))

seq(P_CS+"a-level-aqa-consequences-of-uses-of-computing-adventure-1",
 ("Turing's universal machine paper", "1936: the theoretical foundation of computing"),
 ("ENIAC completed", "1945: early general-purpose electronic computer"),
 ("First microprocessor", "1971: Intel 4004 puts a CPU on a single chip"),
 ("World Wide Web proposed", "1989: Tim Berners-Lee's invention at CERN"),
 ("iPhone launched", "2007: computing moves into every pocket"),
 ("GDPR comes into force", "2018: law responds to mass data collection"))

seq(P_CS+"a-level-aqa-fundamentals-of-algorithms-adventure-1",
 ("O(1) — constant", "Same time however large n gets, e.g. a hash lookup"),
 ("O(log n) — logarithmic", "Binary search: doubling n adds just one step"),
 ("O(n) — linear", "Linear search: time grows in step with n"),
 ("O(n²) — quadratic", "Bubble sort worst case: 10x the data, 100x the time"),
 ("O(2ⁿ) — exponential", "Each extra item doubles the work"),
 ("O(n!) — factorial", "Brute-force travelling salesman — fastest growth here"))

seq(P_CS+"a-level-aqa-fundamentals-of-communication-networking-adventure-1",
 ("Application layer formats the message", "HTTP or SMTP creates the data to send — top of the stack"),
 ("Transport layer splits it into segments", "TCP adds port and sequence numbers next"),
 ("Network layer adds IP addresses", "Each packet gets source and destination IPs"),
 ("Link layer frames the packets", "MAC addresses added for the local network hop"),
 ("Bits transmitted over the medium", "Signals travel down cable, fibre or radio last"))

seq(P_CS+"a-level-aqa-fundamentals-of-computer-organisation-architecture-adventure-1",
 ("PC holds the next instruction's address", "The program counter says where in memory to look"),
 ("Instruction fetched from memory", "It travels via the address and data buses into the CPU"),
 ("Instruction placed in the CIR", "The current instruction register holds it for decoding"),
 ("Control unit decodes it", "Opcode and operand are identified"),
 ("Instruction executed", "The ALU and registers carry out the operation"),
 ("Cycle repeats", "The PC has moved on; the next fetch begins"))

seq(P_CS+"a-level-aqa-fundamentals-of-computer-systems-adventure-1",
 ("Physical hardware", "Transistors and logic gates — the lowest level of abstraction"),
 ("Machine code", "Binary instructions the CPU runs directly"),
 ("Assembly language", "Mnemonics like LDA — one step above machine code"),
 ("High-level language", "Human-readable source, translated down to run"),
 ("Application software", "Programs built on all the layers below"),
 ("The user", "The top of the abstraction stack"))

seq(P_CS+"a-level-aqa-fundamentals-of-data-representation-adventure-1",
 ("Bit", "A single 0 or 1 — the smallest unit"),
 ("Byte", "8 bits"),
 ("Kibibyte (KiB)", "2^10 = 1,024 bytes"),
 ("Mebibyte (MiB)", "2^20 bytes — about a million"),
 ("Gibibyte (GiB)", "2^30 bytes — about a billion"),
 ("Tebibyte (TiB)", "2^40 bytes — about a trillion"))

seq(P_CS+"a-level-aqa-fundamentals-of-data-structures-adventure-1",
 ("Push 3 onto the empty stack", "3 sits at the bottom — the first item in"),
 ("Push 5", "5 now sits on top of 3"),
 ("Push 7", "7 becomes the top of the stack"),
 ("Pop returns 7", "LIFO: the last item in is the first out"),
 ("Pop returns 5", "The next item down comes off"),
 ("Pop returns 3 — stack empty", "First in, last out: 3 leaves at the end"))

seq(P_CS+"a-level-aqa-fundamentals-of-databases-adventure-1",
 ("Unnormalised data", "Repeating groups and redundancy everywhere — the start"),
 ("First normal form (1NF)", "Atomic values; repeating groups removed"),
 ("Second normal form (2NF)", "1NF plus no partial dependencies on the key"),
 ("Third normal form (3NF)", "2NF plus no non-key (transitive) dependencies"),
 ("Normalised database implemented", "Tables are built once the design reaches 3NF"))

seq(P_CS+"a-level-aqa-fundamentals-of-programming-adventure-1",
 ("Main program is executing", "Runs line by line until it reaches the call"),
 ("Subroutine is called", "The return address is pushed onto the call stack"),
 ("Parameters passed in", "Arguments arrive in the subroutine's local variables"),
 ("Subroutine body runs", "Its statements execute using the local data"),
 ("Value returned", "The result is handed back; the stack frame is popped"),
 ("Execution resumes after the call", "Main continues from the saved return address"))

seq(P_CS+"a-level-aqa-systematic-approach-to-problem-solving-adventure-1",
 ("Analysis", "Define the problem and agree the requirements first"),
 ("Design", "Plan algorithms, data structures and the interface"),
 ("Implementation", "Write the actual code from the design"),
 ("Testing", "Check the program against the requirements"),
 ("Evaluation", "Judge how well the finished solution meets the brief"))

seq(P_CS+"a-level-big-o--computational-complexity-adventure-1",
 ("O(1)", "Constant: same time for any input size"),
 ("O(log n)", "Logarithmic: binary search — halving each step"),
 ("O(n)", "Linear: time grows in direct proportion to n"),
 ("O(n log n)", "Linearithmic: merge sort's time complexity"),
 ("O(n²)", "Quadratic: nested loops over the data"),
 ("O(2ⁿ)", "Exponential: intractable as n grows"))

seq(P_CS+"a-level-ccea-computer-architecture-adventure-1",
 ("Registers", "Inside the CPU — fastest access, tiny capacity"),
 ("Cache", "Small, very fast SRAM next to the CPU cores"),
 ("Main memory (RAM)", "Gigabytes of working memory, slower than cache"),
 ("Solid-state drive", "Flash storage — much slower than RAM"),
 ("Hard disk drive", "Spinning platters add mechanical delay"),
 ("Magnetic tape", "Archive backup — the slowest access of all"))

seq(P_CS+"a-level-ccea-data-representation-adventure-1",
 ("4 bits", "Largest unsigned value: 15"),
 ("1 byte (8 bits)", "Largest unsigned value: 255"),
 ("16 bits", "Largest unsigned value: 65,535"),
 ("32 bits", "Largest unsigned value: about 4.29 billion"),
 ("64 bits", "Largest unsigned value: about 1.8 x 10^19"))

seq(P_CS+"a-level-ccea-databases-adventure-1",
 ("Draw the ER diagram", "Entities and relationships designed before any SQL"),
 ("Run CREATE TABLE statements", "Tables must exist before data can go in"),
 ("INSERT INTO adds the records", "Data is entered into the now-existing tables"),
 ("SELECT queries the data", "You can only query records already stored"),
 ("Results returned to the user", "Output is the final step of the workflow"))

seq(P_CS+"a-level-ccea-legal-moral-ethical-issues-adventure-1",
 ("Data Protection Act 1984", "The UK's first data protection law"),
 ("Copyright, Designs and Patents Act 1988", "Protects software and creative works"),
 ("Computer Misuse Act 1990", "Makes hacking and malware criminal offences"),
 ("Data Protection Act 1998", "Implements the EU Data Protection Directive"),
 ("Freedom of Information Act 2000", "Public right to information from authorities"),
 ("Data Protection Act 2018", "Current UK law, sitting alongside GDPR"))

seq(P_CS+"a-level-ccea-logic-problem-solving-adventure-1",
 ("Read through the algorithm", "Understand the logic before tracing anything"),
 ("Set up the trace table columns", "One column per variable and output"),
 ("Step through line by line", "Execute each statement by hand, in order"),
 ("Record every value change", "New values written as each assignment happens"),
 ("Compare output with expectations", "The desk check passes or reveals the logic error"))

seq(P_CS+"a-level-ccea-networks-the-internet-adventure-1",
 ("User enters the URL", "The page's address is typed into the browser first"),
 ("DNS resolves the domain to an IP", "Name servers translate the name into an address"),
 ("Browser sends an HTTP request", "A GET request travels to the server's IP"),
 ("Server returns the page", "HTML and resources are sent back in packets"),
 ("Browser renders the page", "Parsing and display happen only once data arrives"))

seq(P_CS+"a-level-ccea-operating-systems-adventure-1",
 ("Interrupt signal raised", "A device or timer requests the CPU's attention"),
 ("Current instruction completes", "The CPU checks the interrupt flag at cycle end"),
 ("Processor state saved to the stack", "Registers and PC stored so work can resume later"),
 ("Interrupt service routine runs", "The handler deals with the event"),
 ("State restored from the stack", "Saved registers and PC are reloaded"),
 ("Original task resumes", "Execution continues as if never paused"))

seq(P_CS+"a-level-ccea-programming-paradigms-adventure-1",
 ("Assembly language", "1949: mnemonics replace raw machine code"),
 ("FORTRAN", "1957: early high-level procedural language"),
 ("Pascal", "1970: structured programming for teaching"),
 ("C++", "1985: object-oriented extension of C"),
 ("Python", "1991: multi-paradigm high-level language released"),
 ("Java", "1995: 'write once, run anywhere' OOP arrives"))

seq(P_CS+"a-level-ccea-software-engineering-adventure-1",
 ("Requirements analysis", "What must the system do? Agreed first"),
 ("Design", "Architecture, data and interfaces planned"),
 ("Implementation", "Code written from the design documents"),
 ("Testing", "The program is verified against the requirements"),
 ("Deployment", "The system is installed for real users"),
 ("Maintenance", "Fixes and updates after release — the final phase"))

seq(P_CS+"a-level-computer-systems-adventure-1",
 ("Power switched on", "Electricity reaches the motherboard"),
 ("POST runs", "Firmware self-test checks the hardware"),
 ("Bootloader located", "Firmware finds boot code on the startup drive"),
 ("OS kernel loaded into RAM", "The operating system is copied in from storage"),
 ("Drivers and services start", "Hardware support loads once the kernel is running"),
 ("Login screen appears", "Users can sign in only after startup completes"))

seq(P_CS+"a-level-databases--sql-adventure-1",
 ("FROM", "Tables are identified and joined first"),
 ("WHERE", "Individual rows filtered before any grouping"),
 ("GROUP BY", "Surviving rows are collected into groups"),
 ("HAVING", "Whole groups filtered after grouping"),
 ("SELECT", "Columns and aggregates evaluated next"),
 ("ORDER BY", "Sorting is applied to the final result last"))

seq(P_CS+"a-level-functional-programming-adventure-1",
 ("Start with f(g(h(4)))", "Composed calls are evaluated from the inside out"),
 ("Evaluate h(4) = 8", "The innermost function applies first (h doubles)"),
 ("Evaluate g(8) = 11", "g adds 3 to the result of h"),
 ("Evaluate f(11) = 121", "f squares the result of g — outermost last"),
 ("Return 121", "The final value emerges after all three applications"))

seq(P_CS+"a-level-graphs--trees-adventure-1",
 ("Enqueue the start node", "BFS begins with one node in the queue"),
 ("Dequeue the front node and visit it", "FIFO order — the earliest-added node is processed first"),
 ("Enqueue its unvisited neighbours", "Nodes one edge further out join the rear"),
 ("Repeat until the queue is empty", "Levels are explored outwards in order"),
 ("All reachable nodes visited", "The traversal ends in breadth-first order"))

seq(P_CS+"a-level-object-oriented-programming-adventure-1",
 ("Identify the objects in the problem", "Nouns in the specification become candidate classes"),
 ("Define the class", "Attributes and methods written as a blueprint"),
 ("Create a subclass by inheritance", "A specialised class extends the existing parent"),
 ("Instantiate an object", "The constructor runs; no objects exist before this"),
 ("Call the object's methods", "Behaviour happens at runtime, after instantiation"))

seq(P_CS+"a-level-ocr-algorithms-adventure-1",
 ("Choose a pivot element", "Quicksort starts by picking one value"),
 ("Partition around the pivot", "Smaller values go left of it, larger go right"),
 ("Recursively sort the sublists", "The same process applies to each side"),
 ("Reach single-element sublists", "Base case: a list of one is already sorted"),
 ("Combine into the sorted list", "Sublists assemble around their pivots — done"))

seq(P_CS+"a-level-ocr-components-of-a-computer-adventure-1",
 ("Program counter supplies an address", "It points to the next instruction in memory"),
 ("Instruction fetched into the CPU", "It travels along the data bus to the processor"),
 ("Control unit decodes it", "The opcode is interpreted"),
 ("ALU executes the operation", "Arithmetic or logic is carried out"),
 ("Result written to a register", "The outcome is stored"),
 ("Next instruction is fetched", "The cycle starts over"))

seq(P_CS+"a-level-ocr-data-types-structures-adventure-1",
 ("Character", "A single letter, digit or symbol — smallest here"),
 ("Field", "One data item, made up of characters"),
 ("Record", "A set of fields about one entity"),
 ("File (table)", "Many records sharing the same structure"),
 ("Database", "A collection of related files — the largest"))

seq(P_CS+"a-level-ocr-elements-of-computational-thinking-adventure-1",
 ("State the problem clearly", "You cannot solve what you have not defined"),
 ("Decomposition", "Break the problem into smaller sub-problems"),
 ("Pattern recognition", "Spot similarities among the sub-problems"),
 ("Abstraction", "Strip away the irrelevant detail"),
 ("Algorithm design", "Write ordered steps for the simplified problem"),
 ("Test and evaluate the solution", "Check the algorithm against the original problem"))

seq(P_CS+"a-level-ocr-exchanging-data-adventure-1",
 ("Recipient publishes a public key", "Anyone may use it; the private key stays secret"),
 ("Sender encrypts with the public key", "Plaintext becomes ciphertext before sending"),
 ("Ciphertext transmitted", "Intercepted data is unreadable in transit"),
 ("Recipient decrypts with the private key", "Only the matching private key can unlock it"),
 ("Plaintext is read", "The message is recovered at the very end"))

seq(P_CS+"a-level-ocr-legal-moral-ethical-issues-adventure-1",
 ("Copyright, Designs and Patents Act 1988", "Protects code, music and creative works"),
 ("Computer Misuse Act 1990", "Criminalises unauthorised access"),
 ("Data Protection Act 1998", "Rights over personal data"),
 ("Regulation of Investigatory Powers Act 2000", "Governs surveillance powers"),
 ("Investigatory Powers Act 2016", "Updates surveillance law for the internet age"),
 ("Data Protection Act 2018", "UK law alongside GDPR — the newest here"))

seq(P_CS+"a-level-ocr-problem-solving-programming-adventure-1",
 ("Define the problem precisely", "Requirements understood before any design"),
 ("Top-down design", "The problem is split into modules on a structure diagram"),
 ("Code each module as a subroutine", "Small parts implemented from the design"),
 ("Integrate the modules", "Subroutines combined into one program"),
 ("Test the whole solution", "The integrated program is checked against requirements"))

seq(P_CS+"a-level-ocr-software-software-development-adventure-1",
 ("Analysis", "Requirements gathered from stakeholders first"),
 ("Design", "Screens, data structures and algorithms planned"),
 ("Development", "The code is written"),
 ("Testing", "The program is checked against the specification"),
 ("Implementation (installation)", "The system is rolled out to users"),
 ("Maintenance", "Ongoing fixes — the phase that comes last and lasts longest"))

seq(P_CS+"a-level-programming--paradigms-adventure-1",
 ("Machine code", "1940s: the first programs were raw binary"),
 ("Assembly language", "Early 1950s: mnemonics, one-to-one with machine code"),
 ("FORTRAN — procedural era", "1957: high-level statements and subroutines"),
 ("Simula — objects appear", "1967: classes and objects first introduced"),
 ("Prolog — logic programming", "1972: declare what you want, not how"),
 ("Java popularises OOP", "1995: the mainstream object-oriented era"))

seq(P_CS+"a-level-recursion--recursive-algorithms-adventure-1",
 ("factorial(3) is called", "The first call; 3 is not the base case"),
 ("factorial(3) calls factorial(2)", "Each call waits on a smaller problem"),
 ("factorial(2) calls factorial(1)", "Still descending towards the base case"),
 ("Base case: factorial(1) returns 1", "Recursion stops; no deeper calls are made"),
 ("factorial(2) returns 2 × 1 = 2", "The calls unwind in reverse order"),
 ("factorial(3) returns 3 × 2 = 6", "The original call completes last"))

seq(P_CS+"a-level-theory-of-computation-adventure-1",
 ("Regular languages", "Recognised by finite state machines — least power"),
 ("Context-free languages", "Need a pushdown automaton's stack"),
 ("Context-sensitive languages", "Need a linear bounded automaton"),
 ("Decidable (recursive) languages", "A Turing machine always halts with an answer"),
 ("Recursively enumerable languages", "Recognised by Turing machines that may never halt"))

# ============ COMPUTER SCIENCE — GCSE ============

seq(P_CS+"gcse-algorithms-adventure-1",
 ("Start with a sorted list", "Binary search needs ordered data before anything else"),
 ("Check the middle item", "Compare it with the value you are searching for"),
 ("Discard the wrong half", "The target cannot be in it, so ignore it"),
 ("Repeat on the remaining half", "Halve the search space again"),
 ("One item left — found or absent", "The search ends"))

seq(P_CS+"gcse-aqa-computer-networks-adventure-1",
 ("PAN", "Personal area network — Bluetooth range, a few metres"),
 ("LAN", "One building or site, like a school"),
 ("MAN", "A city-sized network"),
 ("WAN", "Connects sites across countries"),
 ("The Internet", "The global network of networks — largest of all"))

seq(P_CS+"gcse-aqa-ethical-legal-environmental-impacts-adventure-1",
 ("Copyright, Designs and Patents Act 1988", "Protects software from piracy"),
 ("Computer Misuse Act 1990", "Created the three hacking offences"),
 ("Data Protection Act 1998", "Principles for handling personal data"),
 ("Freedom of Information Act 2000", "Access to public bodies' information"),
 ("Data Protection Act 2018", "GDPR-era data law — the newest here"))

seq(P_CS+"gcse-aqa-fundamentals-of-algorithms-adventure-1",
 ("Split the list in half", "Merge sort begins by dividing"),
 ("Keep halving the sublists", "Division repeats on every part"),
 ("Reach single-item lists", "One element is sorted by definition — the base case"),
 ("Merge pairs into sorted twos", "Combining starts only after splitting ends"),
 ("Merge again into fours, eights…", "Each merge keeps items in order"),
 ("One fully sorted list remains", "The final merge completes the sort"))

seq(P_CS+"gcse-aqa-fundamentals-of-data-representation-adventure-1",
 ("Bit", "A single 1 or 0"),
 ("Nibble", "4 bits"),
 ("Byte", "8 bits"),
 ("Kilobyte", "1,000 bytes"),
 ("Megabyte", "1,000 kilobytes"),
 ("Gigabyte", "1,000 megabytes — the largest here"))

seq(P_CS+"gcse-aqa-relational-databases-sql-adventure-1",
 ("Design the relational tables", "Fields, keys and links planned before building"),
 ("Tables are created", "An empty structure must exist before data entry"),
 ("INSERT INTO adds records", "Rows go into the existing tables"),
 ("SELECT … FROM … WHERE queries run", "You can only search data already inserted"),
 ("Results table returned", "The query output appears last"))

seq(P_CS+"gcse-boolean-logic--number-systems-adventure-1",
 ("Binary 0100", "Equals 4 in denary — the smallest here"),
 ("Denary 9", "Plain base-10 nine"),
 ("Binary 1100", "Equals 12 in denary"),
 ("Hex F", "Equals 15 in denary"),
 ("Hex 1A", "16 + 10 = 26 in denary"),
 ("Denary 30", "The largest value here"))

seq(P_CS+"gcse-cambridge-igcse-algorithm-design-problem-solving-adventure-1",
 ("Analyse the problem", "Inputs, outputs and processing identified first"),
 ("Decompose into sub-problems", "The task is broken into manageable parts"),
 ("Design the algorithm", "Flowchart or pseudocode plans the solution"),
 ("Dry-run with a trace table", "The design is tested by hand before coding"),
 ("Code and test the solution", "Implementation comes after the checked design"))

seq(P_CS+"gcse-cambridge-igcse-automated-emerging-technologies-adventure-1",
 ("Sensors collect data", "A self-driving car reads cameras and radar first"),
 ("Analogue signals converted to digital", "An ADC turns readings into numbers"),
 ("Microprocessor compares data with set values", "The decision logic runs on the inputs"),
 ("Actuators carry out the action", "Steering or braking happens after the decision"),
 ("New readings give feedback", "The loop repeats — monitoring never stops"))

seq(P_CS+"gcse-cambridge-igcse-boolean-logic-adventure-1",
 ("Read the logic expression", "Identify the brackets, NOT, AND and OR first"),
 ("Evaluate inside brackets", "Highest priority, just like in maths"),
 ("Apply NOT", "Inversion comes before AND and OR"),
 ("Apply AND", "Done before OR in Boolean precedence"),
 ("Apply OR", "The lowest precedence of the three"),
 ("Write the final output", "The result is filled in at the end"))

seq(P_CS+"gcse-cambridge-igcse-data-transmission-adventure-1",
 ("Data split into packets", "Large files are broken up before sending"),
 ("Headers added", "Each packet gets a destination IP and packet number"),
 ("Packets routed independently", "Routers may send them along different paths"),
 ("Packets arrive, possibly out of order", "Different routes mean different arrival times"),
 ("Reassembled using packet numbers", "The original order is restored at the end"))

seq(P_CS+"gcse-cambridge-igcse-hardware-adventure-1",
 ("PC holds the next instruction's address", "The cycle starts at the program counter"),
 ("Instruction fetched from RAM", "Copied from memory into the CPU"),
 ("Instruction decoded", "The control unit works out what it means"),
 ("Instruction executed", "The ALU or registers carry it out"),
 ("Cycle repeats", "The next instruction is fetched"))

seq(P_CS+"gcse-cambridge-igcse-software-adventure-1",
 ("Programmer writes high-level source code", "Humans write Python or Java, not binary"),
 ("Compiler translates the whole program", "Source becomes machine code in one go"),
 ("Executable file produced", "Machine code is saved, ready to distribute"),
 ("OS loads the program into RAM", "It must be in memory before the CPU can run it"),
 ("CPU executes the instructions", "The app finally runs"))

seq(P_CS+"gcse-cambridge-igcse-the-internet-its-uses-adventure-1",
 ("Type the URL into the browser", "The web address identifies the page you want"),
 ("DNS finds the server's IP address", "The domain name is translated into numbers"),
 ("Browser sends the HTTP(S) request", "The request travels to that IP"),
 ("Web server sends back the HTML", "Page data returns across the internet"),
 ("Browser renders the page", "Display happens only after the data arrives"))

seq(P_CS+"gcse-ccea-computer-architecture-adventure-1",
 ("Program counter points to the next instruction", "It holds the memory address to fetch from"),
 ("Instruction fetched from main memory", "Brought into the processor"),
 ("Instruction decoded by the control unit", "The CPU works out the operation"),
 ("Instruction executed", "The calculation is done by the ALU"),
 ("Result stored", "Written to a register or back to memory"),
 ("Next cycle begins", "The CPU fetches again"))

seq(P_CS+"gcse-ccea-cyber-security-ethics-adventure-1",
 ("Attacker finds a leaked username list", "Stolen credentials circulate after a breach"),
 ("Common passwords tried automatically", "A brute-force tool tests thousands per second"),
 ("A weak password is cracked", "'password123' falls quickly"),
 ("The account is accessed without permission", "Unauthorised access has now occurred"),
 ("Prosecution under the Computer Misuse Act", "Legal consequences follow the crime"))

seq(P_CS+"gcse-ccea-data-transmission-networking-adventure-1",
 ("Message broken into packets", "Data is divided up before transmission"),
 ("Each packet labelled with a header", "Addresses and a packet number are attached"),
 ("Routers forward the packets", "Each hop moves them closer, maybe by different routes"),
 ("All packets reach the destination", "Arrival can be out of order"),
 ("Packets reassembled in order", "Sequence numbers rebuild the original message"))

seq(P_CS+"gcse-ccea-database-concepts-adventure-1",
 ("Character", "A single symbol, like 'B' — smallest here"),
 ("Field", "One fact, e.g. Surname"),
 ("Record", "All the fields for one person"),
 ("Table", "All the records of one type"),
 ("Database", "All the related tables together — largest"))

seq(P_CS+"gcse-ccea-programming-concepts-adventure-1",
 ("Declare the variable", "The name must exist before it can be used"),
 ("Assign an initial value", "score = 0 gives it data to hold"),
 ("Use it in an expression", "Calculations read the stored value"),
 ("Update the value", "score = score + 1 changes what is stored"),
 ("Output the final result", "Printed once the processing is finished"))

seq(P_CS+"gcse-ccea-software-adventure-1",
 ("Power button pressed", "The hardware receives power"),
 ("Firmware runs its checks", "POST verifies the hardware works"),
 ("Operating system loaded into RAM", "Copied from storage into main memory"),
 ("Drivers and services start", "The OS prepares the hardware for use"),
 ("User logs in and opens applications", "Apps run only once the OS is ready"))

seq(P_CS+"gcse-computer-systems-adventure-1",
 ("A key is pressed", "Input begins at the input device"),
 ("Signal sent to the CPU", "The keystroke travels into the processor"),
 ("CPU processes the input", "The character code is handled"),
 ("Result written to memory", "The updated screen data is stored"),
 ("Character appears on screen", "Output is the final stage of the IPO chain"))

seq(P_CS+"gcse-cyber-security-adventure-1",
 ("Fake email sent pretending to be a bank", "Phishing starts with the lure"),
 ("Victim clicks the link", "The email's false urgency tricks them"),
 ("Fake website asks for login details", "A convincing copy of the real site"),
 ("Victim enters their password", "Credentials are captured by the attacker"),
 ("Attacker logs into the real account", "The stolen details are used"),
 ("Password changed and bank alerted", "Recovery comes after the attack"))

seq(P_CS+"gcse-data-representation-adventure-1",
 ("1-bit colour depth", "2 colours — black and white"),
 ("2-bit colour depth", "4 colours"),
 ("4-bit colour depth", "16 colours"),
 ("8-bit colour depth", "256 colours"),
 ("16-bit colour depth", "65,536 colours"),
 ("24-bit colour depth", "About 16.7 million colours — the most here"))

seq(P_CS+"gcse-databases-adventure-1",
 ("Character", "The smallest unit — one letter or digit"),
 ("Field", "A single attribute, like DateOfBirth"),
 ("Record", "One row — everything about one entity"),
 ("Table", "Rows and columns of one record type"),
 ("Relational database", "Several linked tables — the largest structure"))

seq(P_CS+"gcse-edexcel-computational-thinking-adventure-1",
 ("Identify the problem", "Computational thinking starts with a clear goal"),
 ("Decomposition", "Split the problem into manageable parts"),
 ("Pattern recognition", "Look for parts you have solved before"),
 ("Abstraction", "Hide the unnecessary detail"),
 ("Design the algorithm", "Write the precise steps"),
 ("Test against the original problem", "Check the solution really works — last"))

seq(P_CS+"gcse-edexcel-computers-adventure-1",
 ("Registers", "Fastest storage, inside the CPU itself"),
 ("Cache", "Small, fast memory next to the processor"),
 ("RAM", "Main memory — fast but volatile"),
 ("SSD", "Secondary storage using flash memory"),
 ("Hard disk", "Magnetic storage with moving parts — slowest here"))

seq(P_CS+"gcse-edexcel-issues-impact-adventure-1",
 ("Copyright, Designs and Patents Act 1988", "Software piracy law"),
 ("Computer Misuse Act 1990", "Hacking becomes a crime"),
 ("Freedom of Information Act 2000", "The right to ask public bodies"),
 ("Equality Act 2010", "Accessibility and anti-discrimination law"),
 ("Investigatory Powers Act 2016", "Surveillance and data retention"),
 ("Data Protection Act 2018", "Current UK data law — newest here"))

seq(P_CS+"gcse-edexcel-networks-adventure-1",
 ("File divided into packets", "Too big to send in one piece"),
 ("Each packet gets a header", "Sender, receiver and packet number added"),
 ("Packets travel via routers", "Possibly along different routes"),
 ("Receiver puts packets back in order", "The numbers show the right sequence"),
 ("Complete file rebuilt at the destination", "Delivery is the final step"))

seq(P_CS+"gcse-edexcel-problem-solving-with-programming-adventure-1",
 ("Read the problem statement", "Understand inputs, outputs and rules first"),
 ("Plan the algorithm", "Flowchart or pseudocode before any code"),
 ("Write the program code", "Translate the plan into a language"),
 ("Test with sample data", "Run it and compare with expected results"),
 ("Debug and fix errors", "Corrections follow the failed tests"),
 ("Final working solution", "Delivered once the tests pass"))

seq(P_CS+"gcse-ethical-legal--environmental-issues-adventure-1",
 ("Raw materials mined", "Metals like gold and coltan are extracted first"),
 ("Devices manufactured", "Factories assemble the components"),
 ("Products shipped worldwide", "Distribution to shops and users"),
 ("Devices used for a few years", "The useful-life stage"),
 ("Old devices become e-waste", "Discarded when replaced"),
 ("Materials recycled or dumped", "The end of the device's life cycle"))

seq(P_CS+"gcse-networks--topologies-adventure-1",
 ("Sender's NIC transmits the frame", "The message leaves the first device"),
 ("Frame arrives at the central switch", "In a star topology everything passes the centre"),
 ("Switch reads the destination MAC address", "It must know the address before forwarding"),
 ("Switch forwards out of one port only", "Unlike a hub, it targets the right device"),
 ("Destination device receives the frame", "Delivery completes the journey"))

seq(P_CS+"gcse-ocr-boolean-logic-adventure-1",
 ("Set up columns for inputs A and B", "The truth table starts with its inputs"),
 ("List every input combination", "Count in binary: 00, 01, 10, 11"),
 ("Work out the intermediate column", "e.g. the bracketed AND part is evaluated first"),
 ("Complete the final output column Q", "The whole expression is evaluated last"),
 ("Read off when Q = 1", "Analysis happens once the table is complete"))

seq(P_CS+"gcse-ocr-ethical-legal-cultural-issues-adventure-1",
 ("Data Protection Act 1984", "First UK law on computer-held personal data"),
 ("Copyright, Designs and Patents Act 1988", "Creative and software copyright"),
 ("Computer Misuse Act 1990", "A response to early hacking cases"),
 ("Data Protection Act 1998", "Replaced the 1984 Act"),
 ("Data Protection Act 2018", "GDPR-era rules — the newest here"))

seq(P_CS+"gcse-ocr-memory-storage-adventure-1",
 ("Registers", "The CPU's own storage — fastest of all"),
 ("Cache", "Tiny, very fast memory beside the CPU"),
 ("RAM", "Main memory; fast but volatile"),
 ("SSD", "Flash secondary storage with no moving parts"),
 ("HDD", "Spinning magnetic platters — slower than flash"),
 ("Optical disc", "DVD or Blu-ray — the slowest access here"))

seq(P_CS+"gcse-ocr-network-security-adventure-1",
 ("Infected attachment downloaded", "The malware needs a way in first"),
 ("Ransomware installs silently", "Code runs without the user noticing"),
 ("Files encrypted across the drive", "Documents become unreadable"),
 ("Ransom note demands payment", "The attackers reveal themselves only now"),
 ("Files restored from backup", "Recovery — this is why backups matter"),
 ("Systems patched and staff trained", "Prevention measures follow the incident"))

seq(P_CS+"gcse-ocr-producing-robust-programs-adventure-1",
 ("Unexpected output spotted", "Testing reveals the symptom first"),
 ("Reproduce the bug reliably", "Find the exact input that triggers it"),
 ("Locate the cause", "Trace tables or breakpoints narrow it down"),
 ("Fix the code", "The correction comes after the diagnosis"),
 ("Retest to confirm", "Run the failing test again — it should now pass"),
 ("Run the full test plan", "Check the fix broke nothing else — last"))

seq(P_CS+"gcse-ocr-programming-fundamentals-adventure-1",
 ("Declare the variable", "Give 'total' a name before anything else"),
 ("Initialise it", "total = 0 sets a starting value"),
 ("Use it in a calculation", "The program reads the stored value"),
 ("Update its value", "total = total + price changes it"),
 ("Output the result", "The final value is printed last"))

seq(P_CS+"gcse-ocr-programming-languages-ides-adventure-1",
 ("Machine code", "1940s: first-generation raw binary programs"),
 ("Assembly language", "Around 1950: second-generation mnemonics"),
 ("FORTRAN", "1957: one of the first high-level languages"),
 ("C", "1972: systems programming at Bell Labs"),
 ("Python", "1991: beginner-friendly high-level language"),
 ("Java", "1995: runs on a virtual machine — newest here"))

seq(P_CS+"gcse-ocr-systems-architecture-adventure-1",
 ("Program counter gives the address", "Where in RAM the next instruction lives"),
 ("Instruction fetched from RAM", "Carried to the CPU along the data bus"),
 ("Control unit decodes the instruction", "The CPU works out what to do"),
 ("Instruction is executed", "The ALU calculates or data moves"),
 ("Cycle begins again", "Fetch–decode–execute repeats constantly"))

seq(P_CS+"gcse-ocr-systems-software-adventure-1",
 ("Power on — firmware in ROM runs", "The BIOS/UEFI is stored permanently"),
 ("POST checks the hardware", "Memory and devices are tested"),
 ("Bootloader hands over to the OS", "The kernel is located on storage"),
 ("OS loaded into RAM", "Main memory holds the OS while it runs"),
 ("Drivers let the OS talk to hardware", "Loaded as the OS starts up"),
 ("Utilities and apps available", "The final, ready state for the user"))

seq(P_CS+"gcse-programming-adventure-1",
 ("Plan the algorithm", "Pseudocode sketches the logic first"),
 ("Write the code", "The plan becomes a real program"),
 ("Run the program", "See what actually happens"),
 ("Test with different inputs", "Normal, boundary and erroneous data are tried"),
 ("Debug any errors", "Fix the problems the tests exposed"),
 ("Program complete and working", "The final step — ready to use"))

seq(P_CS+"gcse-searching--sorting-algorithms-adventure-1",
 ("Start at the beginning of the list", "Bubble sort works left to right"),
 ("Compare the first pair of neighbours", "Two adjacent items at a time"),
 ("Swap them if out of order", "The larger one bubbles to the right"),
 ("Reach the end — one pass done", "The largest item is now at the end"),
 ("Repeat passes along the list", "Each pass needs fewer comparisons"),
 ("Stop when a pass makes no swaps", "The list is sorted"))

seq(P_CS+"gcse-sorting--searching-adventure-1",
 ("Start with the second item", "Insertion sort treats the first item as sorted"),
 ("Compare it with the items to its left", "Look back into the sorted part"),
 ("Slide larger items to the right", "Make room in the sorted section"),
 ("Insert it into the correct place", "The sorted part grows by one"),
 ("Move to the next unsorted item", "Repeat the compare-and-insert"),
 ("Last item inserted — list sorted", "The algorithm finishes"))

seq(P_CS+"gcse-system-architecture-adventure-1",
 ("Program counter supplies the next address", "The CPU always knows where to look next"),
 ("Instruction copied from memory", "The fetch stage completes"),
 ("Decode: control unit interprets it", "The opcode is identified"),
 ("Execute: the ALU does the work", "Arithmetic or logic is performed"),
 ("Result written back", "Stored in a register or memory"),
 ("Next fetch begins", "The cycle never stops while powered on"))

# ============ COMPUTER SCIENCE — IBDP ============

seq(P_CS+"ibdp-computational-thinking-adventure-1",
 ("Define the problem and desired output", "Thinking ahead starts with the goal"),
 ("Decompose into sub-procedures", "The task is broken into smaller steps"),
 ("Express the solution in pseudocode", "Thinking procedurally — precise ordered steps"),
 ("Trace the pseudocode by hand", "Check the logic before implementation"),
 ("Implement and test in code", "Coding comes after the checked design"))

seq(P_CS+"ibdp-computer-organization-adventure-1",
 ("PC passes the address to the MAR", "The memory address register receives it first"),
 ("Instruction arrives in the MDR", "Fetched from primary memory via the data bus"),
 ("Instruction moved to the instruction register", "Held ready for decoding"),
 ("Control unit decodes it", "The operation is identified"),
 ("ALU executes the operation", "The calculation or comparison happens"),
 ("Cycle repeats for the next instruction", "Fetch begins again"))

seq(P_CS+"ibdp-control-systems-adventure-1",
 ("Sensor measures the temperature", "The current state is sampled first"),
 ("Value sent to the microprocessor", "Input data reaches the controller"),
 ("Comparison with the set point", "Too cold? The decision logic runs"),
 ("Heater switched on by the actuator", "The output action follows the decision"),
 ("Room warms; sensor measures again", "Feedback closes the loop"))

seq(P_CS+"ibdp-databases-hl-adventure-1",
 ("Unnormalised form (UNF)", "Repeating groups and mixed data — the start"),
 ("First normal form (1NF)", "Atomic fields; repeating groups removed"),
 ("Second normal form (2NF)", "No partial dependency on a composite key"),
 ("Third normal form (3NF)", "No transitive dependencies remain"),
 ("Schema implemented", "Tables are built once normalised to 3NF"))

seq(P_CS+"ibdp-hl-abstract-data-structures-adventure-1",
 ("Compare the new value with the root", "Every BST insertion starts at the top"),
 ("Go left if smaller, right if larger", "The BST ordering rule chooses the branch"),
 ("Repeat the comparison at the next node", "Descend the tree level by level"),
 ("Reach an empty position", "No child exists where the value belongs"),
 ("Insert the new node as a leaf", "Additions always happen at the bottom"))

seq(P_CS+"ibdp-hl-computer-organisation-adventure-1",
 ("Registers", "Inside the processor — the fastest access"),
 ("Cache memory", "Bridges the CPU–RAM speed gap"),
 ("Primary memory (RAM)", "Directly addressable main memory"),
 ("Solid-state drive (SSD)", "Persistent flash storage, slower than RAM"),
 ("Hard disk drive (HDD)", "Mechanical access takes milliseconds"),
 ("Magnetic tape archive", "Slowest — retrieval can take minutes"))

seq(P_CS+"ibdp-hl-control-adventure-1",
 ("Input sensors sample the environment", "Distance and speed are read first"),
 ("Signals digitised by an ADC", "Analogue readings become numbers"),
 ("Processor evaluates against rules", "The software decides the response"),
 ("Output actuator acts", "Brakes or motor respond to the decision"),
 ("System state changes; sensors re-sample", "Feedback makes it a closed loop"))

seq(P_CS+"ibdp-hl-object-oriented-programming-adventure-1",
 ("Identify objects during design", "The nouns of the problem domain come first"),
 ("Write the class with attributes and methods", "The blueprint must exist before instances"),
 ("Extend it with a subclass", "Inheritance builds on the existing class"),
 ("Construct an object with 'new'", "The constructor initialises the instance"),
 ("Call the object's methods", "Behaviour happens at runtime"),
 ("Garbage collector reclaims the object", "The end of the object's life cycle"))

seq(P_CS+"ibdp-modelling--simulation-hl-adventure-1",
 ("Identify the real-world system", "What exactly is being modelled comes first"),
 ("Choose the variables and rules", "Reality is simplified into a model"),
 ("Build the computational model", "The rules are implemented in software"),
 ("Run the simulation", "Results are generated from the model"),
 ("Compare output with real data", "Validation is only possible after running"),
 ("Refine the model", "Improvements follow the validation"))

seq(P_CS+"ibdp-networks-adventure-1",
 ("Application layer creates the data", "The email or page request is formed first"),
 ("Transport layer segments it", "TCP adds ports and sequence numbers"),
 ("Network layer addresses the packets", "IP routing information is added"),
 ("Data link layer frames them", "MAC addressing for the next hop"),
 ("Physical layer sends the bits", "Electrical or optical signals travel last"))

seq(P_CS+"ibdp-object-oriented-programming-hl-adventure-1",
 ("Analyse requirements for candidate classes", "Design starts with the problem domain"),
 ("Model them in a UML class diagram", "Relationships are mapped before coding"),
 ("Code the superclass first", "A subclass cannot extend what does not exist"),
 ("Derive subclasses by inheritance", "Specialisation builds on the superclass"),
 ("Instantiate objects in the main program", "Instances are created from finished classes"),
 ("Invoke methods through their interfaces", "Runtime behaviour comes last"))

seq(P_CS+"ibdp-resource-management-adventure-1",
 ("A process is running on the CPU", "Normal execution before any event"),
 ("Interrupt raised by a device", "I/O hardware requests attention"),
 ("OS saves the process state", "Context stored so nothing is lost"),
 ("Interrupt handler runs", "The event is dealt with"),
 ("Scheduler picks the next process", "A resource-management decision is made"),
 ("Context restored; execution continues", "The chosen process resumes last"))

seq(P_CS+"ibdp-sl-computer-organisation-adventure-1",
 ("Bit", "1 or 0 — the smallest unit"),
 ("Byte", "8 bits — one character"),
 ("Kilobyte", "About a thousand bytes"),
 ("Megabyte", "About a million bytes — a photo"),
 ("Gigabyte", "About a billion bytes — a film"),
 ("Terabyte", "About a trillion bytes — a backup drive"))

seq(P_CS+"ibdp-sl-control-adventure-1",
 ("Motion sensor detects a person", "The input event starts the sequence"),
 ("Signal sent to the microprocessor", "Input reaches the controller"),
 ("Processor decides the doors must open", "Logic compares the input with its conditions"),
 ("Motor opens the doors", "The actuator performs the output action"),
 ("Sensor confirms the area is clear; doors close", "Feedback completes the cycle"))

seq(P_CS+"ibdp-system-fundamentals-adventure-1",
 ("Planning", "Feasibility and objectives are set first"),
 ("Analysis of requirements", "What the new system must do"),
 ("Design", "Structure, data and interfaces specified"),
 ("Development and testing", "The system is built and verified"),
 ("Implementation (changeover)", "Users move to the new system"),
 ("Maintenance", "Support and updates — the final, ongoing phase"))

seq(P_CS+"ibdp-web-science-hl-adventure-1",
 ("URL entered in the browser", "The request starts with the user"),
 ("DNS lookup returns the IP address", "The name is resolved before connecting"),
 ("HTTP request sent to the server", "The browser asks for the resource"),
 ("Server-side scripts build the response", "PHP and databases run before sending"),
 ("HTML, CSS and JS delivered to the client", "The response crosses the network"),
 ("Browser parses and renders the page", "Display is the final step"))

# ============ COMPUTER SCIENCE — KS3 ============

seq(P_CS+"ks3-algorithms--flowcharts-adventure-1",
 ("Start symbol", "Every flowchart begins with a terminator"),
 ("Input: ask the user for a number", "Data must come in before processing"),
 ("Process: double the number", "The calculation uses the input"),
 ("Decision: is the answer bigger than 10?", "The check needs the answer first"),
 ("Output: show the message", "Results are displayed after the decision"),
 ("Stop symbol", "A terminator ends the flowchart"))

seq(P_CS+"ks3-binary-numbers-adventure-1",
 ("0001", "Equals 1 — the smallest here"),
 ("0011", "Equals 3"),
 ("0110", "Equals 6"),
 ("1000", "Equals 8"),
 ("1010", "Equals 10"),
 ("1111", "Equals 15 — all four bits on"))

seq(P_CS+"ks3-computational-thinking-adventure-1",
 ("Understand the problem", "What exactly needs solving?"),
 ("Decomposition", "Chop the big problem into little ones"),
 ("Pattern recognition", "Spot parts you have seen before"),
 ("Abstraction", "Ignore the details that do not matter"),
 ("Write the algorithm", "Clear steps a computer could follow"),
 ("Test your solution", "Does it actually solve the problem? Check last"))

seq(P_CS+"ks3-data--binary-adventure-1",
 ("Bit", "A single 1 or 0"),
 ("Nibble", "4 bits — half a byte"),
 ("Byte", "8 bits — one character like 'A'"),
 ("Kilobyte", "About 1,000 bytes — a short email"),
 ("Megabyte", "About a million bytes — a photo"),
 ("Gigabyte", "About a billion bytes — a film"))

seq(P_CS+"ks3-digital-wellbeing--e-safety-adventure-1",
 ("Scam message arrives", "It pretends to be from a real company"),
 ("The link is clicked", "The message rushed you into it"),
 ("A fake website appears", "It copies the real login page"),
 ("Password typed into the fake site", "The scammer now has it"),
 ("Scammer breaks into the real account", "Stolen details get used fast"),
 ("Tell an adult and change the password", "Recovery and reporting come last"))

seq(P_CS+"ks3-hardware--software-adventure-1",
 ("Press the power button", "The hardware wakes up"),
 ("The computer checks its parts", "A quick self-test happens first"),
 ("The operating system loads", "Windows or macOS starts up"),
 ("The desktop appears", "The OS is ready for you"),
 ("You open an app", "Application software runs last"))

seq(P_CS+"ks3-internet--world-wide-web-adventure-1",
 ("Type the web address", "You ask for a page by name"),
 ("DNS finds the right server", "Like a phonebook for the internet"),
 ("Your request crosses the internet", "Through routers and cables"),
 ("The server sends the page back", "The data returns in packets"),
 ("Your browser shows the page", "The last step happens on your screen"))

seq(P_CS+"ks3-logic-gates--boolean-basics-adventure-1",
 ("Input A enters the NOT gate", "The signal starts its journey"),
 ("NOT flips the value", "1 becomes 0, and 0 becomes 1"),
 ("Result and input B reach the AND gate", "Both inputs are needed before AND can fire"),
 ("AND output and input C reach the OR gate", "The chain continues"),
 ("Final output Q is produced", "The circuit's answer comes out last"))

seq(P_CS+"ks3-networks--security-adventure-1",
 ("You hit send on a message", "The journey begins on your device"),
 ("Message broken into packets", "Small chunks travel better"),
 ("Packets pass through your router", "The gateway out of your network"),
 ("Routers pass them across the internet", "Hop by hop towards your friend"),
 ("Packets reassembled at the other end", "Put back in the right order"),
 ("Message appears on your friend's screen", "Delivery complete"))

seq(P_CS+"ks3-programming-basics-adventure-1",
 ("Ask the user for a number", "INPUT comes first"),
 ("Store it in a variable", "The value is kept in memory"),
 ("Multiply it by 2", "PROCESS uses the stored value"),
 ("Print the answer", "OUTPUT shows the result"),
 ("Test it: enter 5, expect 10", "Checking comes after the program is written"))

seq(P_CS+"ks3-scratch--block-programming-adventure-1",
 ("Open Scratch and choose a sprite", "You need a character before it can act"),
 ("Add the 'when green flag clicked' block", "Every script needs a trigger at the top"),
 ("Snap command blocks underneath", "Moves and sounds attach below the event"),
 ("Click the green flag to run", "Testing only works once blocks exist"),
 ("Debug and improve the script", "Fixes come after you see it run"))

# ============ FRENCH — A-LEVEL ============

seq(P_FR+"a-level-advanced-grammar-terms-adventure-1",
 ("Le plus-que-parfait", "« J'avais fini » — an action before another past action, earliest"),
 ("Le passé composé", "« J'ai fini hier » — a completed past action"),
 ("Le présent", "« Je finis maintenant » — happening now"),
 ("Le futur proche", "« Je vais finir dans cinq minutes » — very soon"),
 ("Le futur simple", "« Je finirai l'année prochaine » — the distant future"))

seq(P_FR+"a-level-aqa-artistic-culture-in-the-french-speaking-world-adventure-1",
 ("Première projection des frères Lumière", "1895 : la naissance du cinéma à Paris"),
 ("« Le Voyage dans la Lune » de Méliès", "1902 : premier grand film à trucages"),
 ("Premier Festival de Cannes", "1946 : le grand rendez-vous du cinéma mondial"),
 ("« Les Quatre Cents Coups » de Truffaut", "1959 : la Nouvelle Vague arrive"),
 ("Première cérémonie des César", "1976 : les « Oscars français » sont créés"),
 ("« Intouchables » triomphe", "2011 : succès mondial du cinéma français"))

seq(P_FR+"a-level-aqa-aspects-of-french-speaking-society-current-issues-adventure-1",
 ("L'appel de l'abbé Pierre", "1954 : la France découvre la crise du logement"),
 ("La création du RMI", "1988 : le revenu minimum d'insertion"),
 ("La loi contre les exclusions", "1998 : grande loi de lutte contre la pauvreté"),
 ("Le droit au logement opposable (DALO)", "2007 : le logement devient un droit"),
 ("Le RSA remplace le RMI", "2009 : le revenu de solidarité active"))

seq(P_FR+"a-level-aqa-aspects-of-french-speaking-society-current-trends-adventure-1",
 ("L'autorité parentale conjointe", "1970 : fin de la « puissance paternelle »"),
 ("Le divorce par consentement mutuel", "1975 : la loi modernise le divorce"),
 ("La création du PACS", "1999 : une union civile pour tous les couples"),
 ("Le mariage pour tous", "2013 : la loi Taubira"),
 ("La PMA pour toutes les femmes", "2021 : la loi de bioéthique"))

seq(P_FR+"a-level-aqa-aspects-of-political-life-in-the-french-speaking-world-adventure-1",
 ("Charles de Gaulle élu", "1959 : premier président de la Ve République"),
 ("Georges Pompidou", "1969 : élu après le départ de de Gaulle"),
 ("Valéry Giscard d'Estaing", "1974 : élu à 48 ans"),
 ("François Mitterrand", "1981 : la première alternance à gauche"),
 ("Jacques Chirac", "1995 : élu, puis réélu en 2002"),
 ("Emmanuel Macron", "2017 : le plus jeune président élu"))

seq(P_FR+"a-level-aqa-individual-research-project-adventure-1",
 ("Choisir le sujet", "Pick a francophone topic that interests you — step one"),
 ("Formuler la question de recherche", "A focused question guides everything after"),
 ("Rechercher des sources en français", "Articles and videos gathered as evidence"),
 ("Analyser et organiser ses notes", "Findings structured into arguments"),
 ("Préparer la présentation orale", "Summary and key points drafted"),
 ("Présenter et défendre son projet", "The speaking-exam discussion comes last"))

seq(P_FR+"a-level-aqa-literary-texts-and-films-adventure-1",
 ("« Le Tartuffe » de Molière", "1664 : comédie classique"),
 ("« Candide » de Voltaire", "1759 : conte philosophique des Lumières"),
 ("« L'Étranger » de Camus", "1942 : le roman de l'absurde"),
 ("« Bonjour Tristesse » de Sagan", "1954 : roman culte de l'adolescence"),
 ("« Au revoir les enfants »", "1987 : film de Louis Malle sur l'Occupation"),
 ("« La Haine »", "1995 : film de Kassovitz sur la banlieue"))

seq(P_FR+"a-level-ccea-unit-1-speaking-adventure-1",
 ("Choisir le thème de discussion", "The presentation topic is decided first"),
 ("Faire des recherches", "Facts and examples collected on the theme"),
 ("Préparer ses arguments", "Notes organised into points of view"),
 ("S'entraîner à l'oral", "Practice with a partner or teacher"),
 ("Passer l'épreuve orale", "The exam itself comes last"))

seq(P_FR+"a-level-ccea-unit-2-listening-reading-and-use-of-french-adventure-1",
 ("Lire les questions avant l'écoute", "Know what to listen for first"),
 ("Première écoute de l'enregistrement", "Get the gist without writing much"),
 ("Noter des réponses provisoires", "Draft answers after the first hearing"),
 ("Deuxième écoute", "Check the details you missed"),
 ("Vérifier et compléter ses réponses", "Final answers are confirmed at the end"))

seq(P_FR+"a-level-ccea-unit-3-extended-writing-film-and-literature-adventure-1",
 ("Relire l'œuvre et ses notes", "Revisit the film or text before planning"),
 ("Analyser la question posée", "Identify exactly what the essay demands"),
 ("Faire un plan structuré", "Introduction, arguments and conclusion mapped"),
 ("Rédiger l'introduction", "Your line of argument goes on paper first"),
 ("Développer les arguments avec des exemples", "Quotations support each point"),
 ("Écrire la conclusion et se relire", "Conclusion and proofreading come last"))

seq(P_FR+"a-level-ccea-unit-4-as-themes-relationships;-culture-and-lifestyle-adventure-1",
 ("La rencontre", "Two people meet — where every story starts"),
 ("Sortir ensemble", "Dating follows the first meeting"),
 ("Les fiançailles", "Engagement — the promise before marriage"),
 ("Le mariage", "The wedding follows the engagement"),
 ("Les noces d'argent", "The silver anniversary: 25 years married"),
 ("Les noces d'or", "The golden anniversary: 50 years married"))

seq(P_FR+"a-level-ccea-unit-5-a2-themes-young-people-in-society;-our-place-in-a-changing-world-adventure-1",
 ("3 ans — début de l'instruction obligatoire", "Compulsory education starts (loi de 2019)"),
 ("6 ans — entrée à l'école élémentaire", "Primary school proper begins"),
 ("16 ans — fin de l'instruction obligatoire", "Though training is required up to 18"),
 ("18 ans — la majorité", "Voting rights and full legal adulthood"),
 ("25 ans — accès au RSA", "Income support generally opens at twenty-five"))

seq(P_FR+"a-level-cinema--media-vocabulary-adventure-1",
 ("Écrire le scénario", "The screenplay exists before anything is filmed"),
 ("Faire le casting", "Actors are chosen for the written roles"),
 ("Le tournage", "Filming the scenes"),
 ("Le montage", "Editing assembles the footage already shot"),
 ("La sortie en salle", "The cinema release comes last"))

seq(P_FR+"a-level-edexcel-independent-research-project-adventure-1",
 ("Sélectionner un sujet de recherche", "A topic linked to French society is chosen first"),
 ("Définir la problématique", "The guiding research question is framed"),
 ("Consulter des sources variées", "Press, podcasts and studies in French"),
 ("Synthétiser ses découvertes", "Findings organised into conclusions"),
 ("Préparer son exposé oral", "The presentation is drafted and rehearsed"),
 ("Soutenir son projet à l'examen", "The spoken defence is the final stage"))

seq(P_FR+"a-level-edexcel-literature-and-film-study-adventure-1",
 ("« Les Quatre Cents Coups »", "1959 : le film fondateur de Truffaut"),
 ("« Un sac de billes » de Joffo", "1973 : récit d'enfance sous l'Occupation"),
 ("« La Haine »", "1995 : la banlieue à l'écran"),
 ("« Kiffe kiffe demain » de Faïza Guène", "2004 : roman d'une adolescente de banlieue"),
 ("« No et moi » de Delphine de Vigan", "2007 : roman sur une jeune SDF"),
 ("« Intouchables »", "2011 : immense succès populaire"))

seq(P_FR+"a-level-edexcel-theme-1-evolution-of-french-society-adventure-1",
 ("Le droit de vote des femmes", "1944 : les Françaises votent enfin"),
 ("La loi Neuwirth", "1967 : la contraception autorisée"),
 ("La loi Veil", "1975 : l'IVG légalisée"),
 ("La parité en politique", "2000 : loi sur l'égalité des candidatures"),
 ("L'IVG dans la Constitution", "2024 : une liberté garantie"))

seq(P_FR+"a-level-edexcel-theme-2-political-and-artistic-culture-in-the-french-speaking-world-adventure-1",
 ("Le romantisme", "Vers 1820 : Hugo, Delacroix — l'émotion d'abord"),
 ("Le réalisme", "Vers 1850 : Courbet peint la vie ordinaire"),
 ("L'impressionnisme", "1874 : la première exposition (Monet)"),
 ("Le cubisme", "1907 : Picasso et Braque fragmentent les formes"),
 ("Le surréalisme", "1924 : le manifeste d'André Breton"),
 ("La Nouvelle Vague", "1959 : le cinéma se réinvente"))

seq(P_FR+"a-level-edexcel-theme-3-immigration-and-the-multicultural-french-society-adventure-1",
 ("L'immigration italienne et polonaise", "Années 1920 : main-d'œuvre pour la reconstruction"),
 ("L'indépendance de l'Algérie", "1962 : nouvelles migrations vers la France"),
 ("L'arrêt de l'immigration de travail", "1974 : la crise économique ferme les portes"),
 ("La Marche pour l'égalité", "1983 : la « Marche des Beurs »"),
 ("La victoire « black-blanc-beur »", "1998 : la France multiculturelle championne du monde"))

seq(P_FR+"a-level-edexcel-theme-4-the-occupation-and-the-resistance-adventure-1",
 ("L'invasion allemande", "Mai 1940 : la « guerre éclair » frappe la France"),
 ("L'appel du 18 juin", "1940 : de Gaulle appelle à résister depuis Londres"),
 ("Pétain obtient les pleins pouvoirs", "10 juillet 1940 : naissance du régime de Vichy"),
 ("Le Conseil national de la Résistance", "Mai 1943 : Jean Moulin unifie la Résistance"),
 ("Le Débarquement de Normandie", "6 juin 1944 : le Jour J"),
 ("La Libération de Paris", "Août 1944 : la capitale est libérée"))

seq(P_FR+"a-level-literary-analysis-terms-adventure-1",
 ("Lire et annoter le texte", "Close reading comes before any analysis"),
 ("Repérer les procédés littéraires", "Metaphors, register and tone identified"),
 ("Formuler la problématique", "The guiding question for your commentary"),
 ("Construire le plan", "Arguments organised into parts"),
 ("Rédiger l'analyse", "The writing follows the plan"),
 ("Conclure et relire", "Conclusion and proofreading finish the job"))

seq(P_FR+"a-level-multicultural-france-adventure-1",
 ("L'indépendance de l'Algérie", "1962 : arrivée de pieds-noirs et de travailleurs"),
 ("La fermeture de l'immigration de travail", "1974 : le regroupement familial domine ensuite"),
 ("La Marche pour l'égalité", "1983 : de Marseille à Paris contre le racisme"),
 ("L'affaire du foulard de Creil", "1989 : le débat sur la laïcité à l'école"),
 ("La loi sur les signes religieux", "2004 : interdiction à l'école publique"))

seq(P_FR+"a-level-occupation-period-history-adventure-1",
 ("La déclaration de guerre", "Septembre 1939 : la « drôle de guerre » commence"),
 ("L'armistice signé à Rethondes", "22 juin 1940 : la France divisée en zones"),
 ("La rafle du Vél d'Hiv", "Juillet 1942 : environ 13 000 Juifs arrêtés à Paris"),
 ("L'invasion de la zone libre", "Novembre 1942 : tout le pays est occupé"),
 ("Le Débarquement", "Juin 1944 : les Alliés en Normandie"),
 ("La Libération de Paris", "25 août 1944 : de Gaulle descend les Champs-Élysées"))

seq(P_FR+"a-level-politics--society-adventure-1",
 ("La Constitution de la Ve République", "1958 : adoptée par référendum"),
 ("L'élection du président au suffrage direct", "1962 : le référendum de de Gaulle"),
 ("Mai 68", "1968 : grèves et révolte étudiante"),
 ("La première alternance", "1981 : Mitterrand et la gauche au pouvoir"),
 ("Le quinquennat", "2000 : le mandat présidentiel passe à cinq ans"),
 ("L'élection d'Emmanuel Macron", "2017 : la recomposition politique"))

# ============ FRENCH — GCSE ============

seq(P_FR+"gcse-aqa-theme-1-people-and-lifestyle-identity-and-relationships;-healthy-living-and-lifestyle;-education-and-work-adventure-1",
 ("Le bébé", "A baby — life's first stage"),
 ("L'enfant", "Childhood — the primary-school years"),
 ("L'adolescent", "The teenage years"),
 ("L'adulte", "Working adult life"),
 ("Le retraité", "Retired after a working life — the last stage here"))

seq(P_FR+"gcse-aqa-theme-2-popular-culture-free-time-activities;-customs-festivals-and-celebrations;-celebrity-culture-adventure-1",
 ("Le jour de l'An", "1er janvier — the year begins"),
 ("La Chandeleur", "2 février — crêpes day"),
 ("Pâques", "Mars ou avril — chocolate eggs in spring"),
 ("La fête nationale", "14 juillet — fireworks for Bastille Day"),
 ("La Toussaint", "1er novembre — remembering the dead"),
 ("Noël", "25 décembre — the year's last big celebration here"))

seq(P_FR+"gcse-aqa-theme-3-communication-and-the-world-around-us-travel-and-tourism;-media-and-technology;-the-environment-and-where-people-live-adventure-1",
 ("Réserver le voyage", "Booking comes before everything else"),
 ("Faire sa valise", "Packing before leaving home"),
 ("Enregistrer les bagages", "Check-in at the airport desk"),
 ("Passer la sécurité", "Security comes after check-in"),
 ("Embarquer", "Boarding at the gate"),
 ("Atterrir à destination", "Landing ends the journey"))

seq(P_FR+"gcse-cambridge-igcse-area-a-everyday-activities-adventure-1",
 ("Je me réveille", "6 h 45 — waking up comes first"),
 ("Je me lève", "7 h — out of bed after waking"),
 ("Je prends le petit déjeuner", "7 h 15 — breakfast"),
 ("Je vais au collège", "8 h — off to school"),
 ("Je déjeune à la cantine", "Midi — lunchtime"),
 ("Je me couche", "22 h — bedtime ends the day"))

seq(P_FR+"gcse-cambridge-igcse-area-b-personal-and-social-life-adventure-1",
 ("La naissance", "Birth — where life begins"),
 ("L'enfance", "Childhood follows"),
 ("L'adolescence", "The teenage years"),
 ("Les fiançailles", "Engagement, a milestone of adult life"),
 ("Le mariage", "The wedding follows the engagement"),
 ("La retraite", "Retirement comes last here"))

seq(P_FR+"gcse-cambridge-igcse-area-c-the-world-around-us-adventure-1",
 ("Le village", "A few hundred inhabitants — smallest here"),
 ("La ville", "Thousands of people — bigger than a village"),
 ("La région", "Contains many towns, e.g. la Normandie"),
 ("Le pays", "La France — contains all its regions"),
 ("Le continent", "L'Europe contains many countries"),
 ("Le monde", "The whole planet — largest of all"))

seq(P_FR+"gcse-cambridge-igcse-area-d-the-world-of-work-adventure-1",
 ("Chercher une offre d'emploi", "Find the vacancy first"),
 ("Envoyer le CV et la lettre de motivation", "Apply to the offer you found"),
 ("Passer un entretien d'embauche", "The interview follows a successful application"),
 ("Recevoir une offre", "The employer decides after the interview"),
 ("Signer le contrat de travail", "Signing comes before day one"),
 ("Commencer le nouveau travail", "The first day at work — the last step"))

seq(P_FR+"gcse-cambridge-igcse-area-e-the-international-world-adventure-1",
 ("Choisir la destination", "Picking the country comes first"),
 ("Réserver les billets et l'hôtel", "Booking follows the choice"),
 ("Faire les valises", "Packing before departure"),
 ("Prendre l'avion", "The flight out"),
 ("Découvrir le pays", "Sightseeing during the stay"),
 ("Rentrer chez soi", "The return home ends the trip"))

seq(P_FR+"gcse-ccea-context-1-identity-lifestyle-and-culture-adventure-1",
 ("L'Épiphanie", "6 janvier — la galette des rois"),
 ("Mardi gras", "Février ou début mars — carnival before Lent"),
 ("La fête du Travail", "1er mai — the day of the muguet"),
 ("La fête de la Musique", "21 juin — music fills the streets"),
 ("Le 14 Juillet", "Fireworks for the national day"),
 ("La Saint-Sylvestre", "31 décembre — the year's final night"))

seq(P_FR+"gcse-ccea-context-2-local-national-international-and-global-areas-of-interest-adventure-1",
 ("Mon quartier", "The streets around your home — smallest here"),
 ("Ma ville", "The whole town"),
 ("Ma région", "Contains many towns"),
 ("Mon pays", "The whole nation"),
 ("L'Europe", "The continent"),
 ("Le monde entier", "The global scale — largest"))

seq(P_FR+"gcse-ccea-context-3-school-life-studies-and-the-world-of-work-adventure-1",
 ("L'école primaire", "Ages 6 to 11 in France"),
 ("Le collège", "Ages 11 to 15 — ends with le brevet"),
 ("Le lycée", "Ages 15 to 18 — ends with le bac"),
 ("L'université", "Higher education after the bac"),
 ("Le premier emploi", "Working life follows study — the last step here"))

seq(P_FR+"gcse-common-verbs-present-adventure-1",
 ("Je me lève", "7 h : getting up starts the day"),
 ("Je vais au collège", "8 h : travelling to school"),
 ("Je fais mes devoirs", "17 h : homework after school"),
 ("Je dîne avec ma famille", "19 h 30 : the evening meal"),
 ("Je regarde la télé", "20 h 30 : relaxing after dinner"),
 ("Je dors", "22 h : sleep ends the day"))

seq(P_FR+"gcse-edexcel-igcse-topic-1-home-and-abroad-adventure-1",
 ("Faire une réservation", "Hotel and tickets are booked first"),
 ("Préparer ses bagages", "Packing for the booked trip"),
 ("Partir en voyage", "Departure day arrives"),
 ("Arriver à l'hôtel", "Check-in once abroad"),
 ("Visiter les monuments", "Sightseeing during the stay"),
 ("Retourner à la maison", "Home again — the end of the trip"))

seq(P_FR+"gcse-edexcel-igcse-topic-2-education-and-employment-adventure-1",
 ("La sixième", "Age 11 — the first year of collège"),
 ("La cinquième", "Age 12 — the second year"),
 ("La quatrième", "Age 13 — the third year"),
 ("La troisième", "Age 14–15 — brevet year, the last of collège"),
 ("La seconde", "Age 15 — lycée begins"),
 ("La terminale", "Age 17–18 — bac year, the final class"))

seq(P_FR+"gcse-edexcel-igcse-topic-3-personal-life-and-relationships-adventure-1",
 ("L'arrière-grand-mère (92 ans)", "The oldest member of the family"),
 ("Le grand-père (70 ans)", "Grandfather, seventy years old"),
 ("La mère (45 ans)", "Mum, forty-five"),
 ("Le fils aîné (17 ans)", "The elder son"),
 ("La fille cadette (12 ans)", "The younger daughter"),
 ("Le bébé (6 mois)", "The youngest of all"))

seq(P_FR+"gcse-edexcel-igcse-topic-4-the-world-around-us-adventure-1",
 ("La maison", "One home — the smallest space here"),
 ("La rue", "The street contains many houses"),
 ("Le quartier", "The neighbourhood contains many streets"),
 ("La ville", "The town contains its neighbourhoods"),
 ("Le pays", "The country contains many towns"),
 ("La planète", "The Earth — the largest of all"))

seq(P_FR+"gcse-edexcel-igcse-topic-5-social-activities-fitness-and-health-adventure-1",
 ("Le petit déjeuner", "Vers 7 h 30 — the morning meal"),
 ("Le déjeuner", "Vers 12 h 30 — lunch"),
 ("Le goûter", "Vers 16 h 30 — the after-school snack"),
 ("L'apéritif", "Vers 19 h — before dinner"),
 ("Le dîner", "Vers 20 h — the evening meal, last here"))

seq(P_FR+"gcse-edexcel-theme-1-my-personal-world-adventure-1",
 ("Le nourrisson", "A newborn baby — the very start"),
 ("L'écolier", "A primary-school child"),
 ("Le collégien", "At collège, ages 11–15"),
 ("Le lycéen", "At lycée, ages 15–18"),
 ("L'étudiant", "At university after the bac"),
 ("L'adulte au travail", "Working life follows the studies"))

seq(P_FR+"gcse-edexcel-theme-2-lifestyle-and-wellbeing-adventure-1",
 ("Le petit déjeuner", "7 h : tartines et chocolat chaud"),
 ("Le déjeuner", "Midi : the main midday meal"),
 ("Le goûter", "16 h : the children's snack"),
 ("Le dîner", "20 h : the evening meal"),
 ("Se coucher tôt", "22 h : sleep is part of wellbeing — last"))

seq(P_FR+"gcse-edexcel-theme-3-my-neighbourhood-adventure-1",
 ("Ma chambre", "The smallest space — your room"),
 ("Ma maison", "The house contains your room"),
 ("Ma rue", "Your street contains your house"),
 ("Mon quartier", "The neighbourhood contains the street"),
 ("Ma ville", "The town contains it all — biggest here"))

seq(P_FR+"gcse-edexcel-theme-4-media-and-technology-adventure-1",
 ("La lettre", "For centuries the only way to write home"),
 ("Le téléphone fixe", "1876 : the voice travels at a distance"),
 ("La radio", "Années 1920 : broadcasting begins"),
 ("La télévision", "Années 1950 : screens enter French homes"),
 ("L'Internet grand public", "Années 1990 : the web arrives"),
 ("Le smartphone", "2007 : the iPhone opens a new era"))

seq(P_FR+"gcse-edexcel-theme-5-studying-and-my-future-adventure-1",
 ("Passer le brevet", "Age 15 — the collège exam comes first"),
 ("Entrer au lycée", "The years after collège"),
 ("Passer le bac", "Age 18 — the school-leaving exam"),
 ("Étudier à l'université", "Higher education after the bac"),
 ("Obtenir un diplôme", "Graduation follows the studies"),
 ("Trouver un emploi", "Working life — the goal at the end"))

seq(P_FR+"gcse-edexcel-theme-6-travel-and-tourism-adventure-1",
 ("Faire sa valise", "Packing happens at home first"),
 ("Arriver à l'aéroport", "With your suitcase already packed"),
 ("Enregistrer les bagages", "The check-in desk takes the suitcase"),
 ("Passer le contrôle de sécurité", "Security after check-in"),
 ("Embarquer dans l'avion", "Boarding at the gate"),
 ("Atterrir à destination", "Landing ends the journey"))

seq(P_FR+"gcse-environment--issues-adventure-1",
 ("Le protocole de Montréal", "1987 : protéger la couche d'ozone"),
 ("Le sommet de la Terre à Rio", "1992 : la convention sur le climat"),
 ("Le protocole de Kyoto", "1997 : premiers engagements chiffrés"),
 ("L'accord de Paris", "2015 : limiter le réchauffement sous les 2 °C"),
 ("La COP26 à Glasgow", "2021 : des engagements sur le charbon"))

seq(P_FR+"gcse-holidays--travel-adventure-1",
 ("Choisir la destination", "Decide where to go — the first step"),
 ("Réserver l'hôtel et les billets", "Booking after choosing"),
 ("Faire les valises", "Packing before departure"),
 ("Voyager en avion ou en train", "The journey out"),
 ("Profiter des vacances", "Beach, visits and rest"),
 ("Rentrer à la maison", "The return ends the holiday"))

seq(P_FR+"gcse-identity--relationships-adventure-1",
 ("La naissance", "Birth — the beginning"),
 ("L'enfance", "Childhood"),
 ("L'adolescence", "Teenage years and friendships"),
 ("Les fiançailles", "Engagement in adult life"),
 ("Le mariage", "The wedding follows the engagement"),
 ("Les noces d'or", "Fifty years of marriage — last here"))

seq(P_FR+"gcse-local-area-vocabulary-adventure-1",
 ("La rue", "A single street — the smallest here"),
 ("Le quartier", "A neighbourhood of several streets"),
 ("La ville", "The town contains its quartiers"),
 ("La région", "e.g. la Bretagne — many towns"),
 ("Le pays", "La France — the largest area here"))

seq(P_FR+"gcse-ocr-theme-1-people-and-lifestyle-adventure-1",
 ("L'école maternelle", "Ages 3 to 6 — schooling starts here"),
 ("L'école élémentaire", "Ages 6 to 11"),
 ("Le collège", "Ages 11 to 15"),
 ("Le lycée", "Ages 15 to 18"),
 ("L'université", "After the bac — the last stage here"))

seq(P_FR+"gcse-ocr-theme-2-popular-culture-adventure-1",
 ("Le jour de l'An", "1er janvier"),
 ("La Saint-Valentin", "14 février"),
 ("Le poisson d'avril", "1er avril — paper fish and pranks"),
 ("La fête de la Musique", "21 juin — the longest day"),
 ("Le 14 Juillet", "La fête nationale"),
 ("Noël", "25 décembre — closes the year"))

seq(P_FR+"gcse-ocr-theme-3-communication-and-the-world-around-us-adventure-1",
 ("Le courrier postal", "The oldest way to communicate here"),
 ("Le téléphone", "1876 : speaking across distances"),
 ("La télévision", "Années 1950 : mass media reaches homes"),
 ("Le courriel (e-mail)", "Années 1990 : writing goes digital"),
 ("Les réseaux sociaux", "2004 : Facebook arrives"),
 ("Le smartphone", "2007 : everything in one pocket device"))

seq(P_FR+"gcse-school-life-adventure-1",
 ("Arriver au collège", "8 h — the school day begins"),
 ("Le premier cours", "8 h 15 — lessons start"),
 ("La récréation", "10 h — morning break"),
 ("Déjeuner à la cantine", "12 h 30 — lunchtime"),
 ("Les cours de l'après-midi", "14 h — back to lessons"),
 ("La sortie des classes", "17 h — home time ends the day"))

seq(P_FR+"gcse-vocabulary-games-adventure-1",
 ("Trois", "3 — the smallest number here"),
 ("Treize", "13 — don't mix it up with trois!"),
 ("Trente", "30"),
 ("Soixante", "60"),
 ("Quatre-vingts", "80 — literally 'four twenties'"),
 ("Cent", "100 — the biggest here"))

# ============ FRENCH — IBDP ============

seq(P_FR+"ibdp-advanced-grammar-adventure-1",
 ("Je", "First person singular — a paradigm always starts here"),
 ("Tu", "Second person singular"),
 ("Il / elle / on", "Third person singular"),
 ("Nous", "First person plural"),
 ("Vous", "Second person plural"),
 ("Ils / elles", "Third person plural — the table ends here"))

seq(P_FR+"ibdp-cultural-comparison-adventure-1",
 ("Le mot « francophonie » apparaît", "1880 : le géographe Onésime Reclus"),
 ("La création de l'ACCT", "1970 : première agence de la Francophonie, à Niamey"),
 ("Le premier Sommet de la Francophonie", "1986 : à Versailles"),
 ("Le poste de Secrétaire général créé", "1997 : au sommet de Hanoï"),
 ("L'ACCT devient l'OIF", "2005 : l'Organisation internationale de la Francophonie"))

seq(P_FR+"ibdp-experiences-adventure-1",
 ("La naissance", "Day one of life"),
 ("La première rentrée scolaire", "Around age 3 in France"),
 ("Le passage du bac", "Around age 18"),
 ("Le premier emploi", "Working life begins after study"),
 ("La retraite", "The final milestone here, after a career"))

seq(P_FR+"ibdp-hl-literature-two-works-studied-adventure-1",
 ("« Phèdre » de Racine", "1677 : la tragédie classique"),
 ("« Madame Bovary » de Flaubert", "1857 : le réalisme"),
 ("« Du côté de chez Swann » de Proust", "1913 : le début de la Recherche"),
 ("« L'Étranger » de Camus", "1942 : l'absurde"),
 ("« En attendant Godot » de Beckett", "1953 : le théâtre de l'absurde"),
 ("« L'Amant » de Duras", "1984 : prix Goncourt"))

seq(P_FR+"ibdp-human-ingenuity-adventure-1",
 ("L'imprimerie de Gutenberg", "Vers 1450 : la révolution du livre"),
 ("La montgolfière", "1783 : premier vol humain"),
 ("Le cinématographe", "1895 : l'invention des frères Lumière"),
 ("Le TGV", "1981 : Paris–Lyon à grande vitesse"),
 ("L'Internet grand public", "Années 1990 : le web pour tous"),
 ("L'IA générative", "Années 2020 : une nouvelle révolution"))

seq(P_FR+"ibdp-identities-adventure-1",
 ("L'enfance", "Identity begins forming in childhood"),
 ("L'adolescence", "Teenage years — questioning who you are"),
 ("La majorité à 18 ans", "Legal adulthood in France"),
 ("La vie active", "Career shapes adult identity"),
 ("La retraite", "A new identity after working life ends"))

seq(P_FR+"ibdp-literary-texts-hl-adventure-1",
 ("« Candide »", "1759 : Voltaire"),
 ("« Les Misérables »", "1862 : Victor Hugo"),
 ("« Boule de suif »", "1880 : Maupassant"),
 ("« Antigone » d'Anouilh", "1944 : créée sous l'Occupation"),
 ("« Bonjour Tristesse »", "1954 : Françoise Sagan"),
 ("« Kiffe kiffe demain »", "2004 : Faïza Guène"))

seq(P_FR+"ibdp-sharing-the-planet-adventure-1",
 ("Le rapport Meadows", "1972 : « Les limites à la croissance »"),
 ("Le protocole de Montréal", "1987 : sauver la couche d'ozone"),
 ("Le protocole de Kyoto", "1997 : réduire les gaz à effet de serre"),
 ("L'accord de Paris", "2015 : la COP21 à Paris"),
 ("La COP28 à Dubaï", "2023 : sortir des énergies fossiles"))

seq(P_FR+"ibdp-social-organization-adventure-1",
 ("L'école maternelle", "Ages 3–6 — schooling starts here"),
 ("L'école élémentaire", "Ages 6–11"),
 ("Le collège", "Ages 11–15, ends with le brevet"),
 ("Le lycée", "Ages 15–18, ends with le bac"),
 ("L'enseignement supérieur", "University and grandes écoles — last"))

# ============ FRENCH — KS3 ============

seq(P_FR+"ks3-classroom-objects-adventure-1",
 ("La gomme", "The little eraser — it fits in the pencil case"),
 ("La trousse", "The pencil case — it fits in the school bag"),
 ("Le cartable", "The school bag — it sits in the classroom"),
 ("La salle de classe", "The classroom — one room of the school"),
 ("L'école", "The whole school — the biggest here"))

seq(P_FR+"ks3-colours--adjectives-adventure-1",
 ("Rouge", "Red — the top stripe of the rainbow"),
 ("Orange", "Orange comes after red"),
 ("Jaune", "Yellow — the third stripe"),
 ("Vert", "Green — in the middle"),
 ("Bleu", "Blue follows green"),
 ("Violet", "Purple — the last rainbow colour"))

seq(P_FR+"ks3-family-members-adventure-1",
 ("L'arrière-grand-père (90 ans)", "Great-grandfather — the oldest"),
 ("La grand-mère (68 ans)", "Grandmother"),
 ("Le père (40 ans)", "Dad"),
 ("La grande sœur (15 ans)", "Big sister"),
 ("Le petit frère (8 ans)", "Little brother"),
 ("Le bébé (1 an)", "The baby — the youngest of all"))

seq(P_FR+"ks3-greetings--introductions-adventure-1",
 ("« Bonjour ! »", "The greeting always opens a conversation"),
 ("« Comment t'appelles-tu ? »", "Asking the name comes after saying hello"),
 ("« Je m'appelle Emma. »", "The answer follows the question"),
 ("« Enchanté ! »", "'Nice to meet you' — once you know the name"),
 ("« Au revoir ! »", "Goodbye always ends the conversation"))

seq(P_FR+"ks3-numbers--days-adventure-1",
 ("Lundi", "Monday — the French week starts here"),
 ("Mardi", "Tuesday — day two"),
 ("Mercredi", "Wednesday — day three"),
 ("Jeudi", "Thursday — day four"),
 ("Vendredi", "Friday — day five"),
 ("Samedi", "Saturday — day six"))

seq(P_FR+"ks3-time--daily-routine-adventure-1",
 ("Je me réveille à sept heures", "7:00 — waking up comes first"),
 ("Je me lave à sept heures et quart", "7:15 — washing after waking"),
 ("Je prends le petit déjeuner à sept heures et demie", "7:30 — breakfast"),
 ("Je vais à l'école à huit heures", "8:00 — off to school"),
 ("Je dîne à sept heures du soir", "19:00 — dinner in the evening"),
 ("Je me couche à neuf heures du soir", "21:00 — bedtime comes last"))

# ============ APPLY ============

def main():
    base = os.path.dirname(os.path.abspath(__file__))
    root = os.path.dirname(base)  # classcraft/
    stems = open(os.path.join(base, "batch10.txt")).read().split()
    # validate authored data
    errs = []
    for stem, items in S.items():
        if stem not in stems:
            errs.append(f"UNKNOWN STEM {stem}")
        if not (5 <= len(items) <= 6):
            errs.append(f"{stem}: {len(items)} items")
        terms = [i["term"] for i in items]
        if len(set(terms)) != len(terms):
            errs.append(f"{stem}: duplicate terms")
        for i in items:
            if len(i["term"]) > 55:
                errs.append(f"{stem}: term too long ({len(i['term'])}): {i['term']}")
            if len(i["def"]) > 85:
                errs.append(f"{stem}: def too long ({len(i['def'])}): {i['def']}")
    missing = [s for s in stems if s not in S]
    if errs:
        print("\n".join(errs)); sys.exit(1)
    if missing:
        print("MISSING (skipped):"); [print(" ", m) for m in missing]
    n = 0
    for stem, items in S.items():
        path = os.path.join(root, "adventures", "_specs", stem + ".json")
        with open(path, encoding="utf-8") as f:
            d = json.load(f)
        d["sequence"] = items
        with open(path, "w", encoding="utf-8") as f:
            json.dump(d, f, ensure_ascii=False, separators=(',', ': '))
        n += 1
    print(f"applied sequences to {n} specs; skipped {len(missing)}")

if __name__ == "__main__":
    main()
