/**
 * Product & Website Configuration Data - Python Mastery 2026 Edition
 */
var PRODUCT_CONFIG = {
  brandName: "Python Mastery",
  badge: "2026 EDITION",
  currentPrice: 199,
  originalPrice: 1299,
  buyUrl: "https://superprofile.bio/vp/python-master-notes-—-2026-edition",
  whatsappNumber: "+918595403030",
  whatsappDisplay: "+91-8595403030",
  supportEmail: "admin@selfstudynotes.com",
  
  // Python Note Samples showcased across interactive widgets and full-screen preview modal
  sqlSamples: [
    {
      id: 0,
      title: "Chapter 02: Python Memory Model & Heap Binding",
      badge: "CHAPTER 02  -  MEMORY INTERNALS",
      sub: "Name Binding (Stack Frame) vs. PyObject Instances (Heap Memory)",
      image: "assets/python/page_023.png",
      bullets: [
        "Variables as Pointers: Python variables are labels bound to heap PyObjects, never raw fixed-type memory boxes",
        "Stack Frame Namespace: Local names reference dynamically allocated heap memory addresses",
        "Object Rebinding & Aliasing: What actually happens under the hood when multiple variables reference one object",
        "FAANG Essential: Why understanding pointer rebinding prevents critical shallow-copy mutation bugs"
      ],
      tag: "Memory Internals"
    },
    {
      id: 1,
      title: "Collector Poster 1: CPython 3.14 Execution Architecture",
      badge: "POSTER 1  -  CPYTHON RUNTIME",
      sub: "From Source Tokens to Bytecode, Call Stack & Heap PyObjects",
      image: "assets/python/page_007.png",
      bullets: [
        "Compilation Pipeline: Source Code  ->  Tokens  ->  AST  ->  Bytecode (.pyc)  ->  Python Virtual Machine (PVM)",
        "Call Stack Lifecycle: Stack Frames, local variable scopes, evaluation stack, and activation records",
        "Heap Memory Allocation: Small object allocator (PyMalloc), arenas, pools, and object headers",
        "Garbage Collection: Exact mechanics of Reference Counting + Tracing Cyclic GC for circular references"
      ],
      tag: "CPython 3.14"
    },
    {
      id: 2,
      title: "Collector Poster 2: Computational Complexity & Big-O Blueprint",
      badge: "POSTER 2  -  BIG-O DECISION TREE",
      sub: "Master Data Structure Selection & Asymptotic Decision Tree",
      image: "assets/python/page_009.png",
      bullets: [
        "Decision Tree: How to choose between list, tuple, set, dict, deque, and heapq for any problem",
        "Asymptotic Runtimes: Exact Average vs Worst-Case time complexity for search, insert, delete, and slice",
        "Memory Footprint & Over-Allocation: Storage efficiency across contiguous arrays vs open-address hash tables",
        "Interview Goldmine: Instant reference for coding rounds, LeetCode optimization, and system design"
      ],
      tag: "Big-O Decision Tree"
    },
    {
      id: 3,
      title: "Chapter 07: Dynamic Arrays & Memory Layouts",
      badge: "CHAPTER 07  -  DATA STRUCTURES",
      sub: "Over-Allocated Arrays, Pointer Lists & Amortized O(1) Growth",
      image: "assets/python/page_116.png",
      bullets: [
        "List Memory Layout: Contiguous dynamic pointer array storing memory addresses of heterogeneous items",
        "Amortized O(1) Append: Growth formula new_allocated = n + (n >> 3) + 6 for zero reallocation overhead",
        "Tuple Compact Struct: Single allocation, immutable layout, and cache-friendly fixed struct performance",
        "Hash Table vs Array: Why dict/set membership check is O(1) average time compared to O(n) list scans"
      ],
      tag: "Array Internals"
    },
    {
      id: 4,
      title: "Chapter 09: Functions, Call Stack & LEGB Scope",
      badge: "CHAPTER 09  -  FUNCTIONS & SCOPE",
      sub: "Call Stack Activation Frames & The LEGB Scope Resolution Rule",
      image: "assets/python/page_152.png",
      bullets: [
        "LEGB Resolution Order: Local  ->  Enclosing (closure)  ->  Global (module)  ->  Built-in namespace lookup",
        "Call Stack Activation: How stack frames are pushed on invocation and popped/reclaimed upon return",
        "Closures & Nonlocal: Preserving outer scope state and preventing common global variable mutation bugs",
        "Decorators & Generators: Function metadata, wrapper execution flow, and lazy memory-efficient pipelines"
      ],
      tag: "LEGB Scope"
    },
    {
      id: 5,
      title: "Chapter 10: Recursion Mechanics & Call Stack",
      badge: "CHAPTER 10  -  RECURSION & STACKS",
      sub: "Stack Winding (Push Calls) vs. Unwinding (Return Cascade)",
      image: "assets/python/page_172.png",
      bullets: [
        "Stack Winding: Every recursive step pushes a new activation frame until the Base Case is reached",
        "Stack Unwinding: Return values cascade back down the call tree to compute the final result",
        "Base Case Guard: Preventing RecursionError and stack overflow in deep tree traversal",
        "Divide-and-Conquer: Visual walkthrough of recursive problem decomposition and complexity analysis"
      ],
      tag: "Recursion Stack"
    },
    {
      id: 6,
      title: "Chapter 11: Object-Oriented Programming (OOP) Architecture",
      badge: "CHAPTER 11  -  OOP ARCHITECTURE",
      sub: "Class Blueprints, Instances, Encapsulation, Inheritance & MRO",
      image: "assets/python/page_184.png",
      bullets: [
        "Class vs Instance: Blueprint vs memory instances, class variables vs instance variables (__dict__)",
        "Encapsulation & Properties: Private naming conventions (_var, __var) and @property getters/setters",
        "Inheritance & super(): Method Resolution Order (C3 Linearization / MRO) and multi-inheritance dispatch",
        "Dunder Protocols: __init__, __repr__, __str__, __eq__, and writing pythonic, clean dataclasses"
      ],
      tag: "OOP & MRO"
    },
    {
      id: 7,
      title: "Chapter 16: Data Science, NumPy & Pandas Axes",
      badge: "CHAPTER 16  -  DATA SCIENCE & ML",
      sub: "NumPy 2D Vectorized Axes, Pandas DataFrame & Statistical Plots",
      image: "assets/python/page_275.png",
      bullets: [
        "NumPy/Pandas Axes: Crystal-clear visual of axis=0 (down rows) vs axis=1 (across columns)",
        "Vectorized Computation: Why C-contiguous NumPy arrays run 50x faster than pure Python loops",
        "DataFrame Operations: Aggregations, grouping, filtering, and statistical analysis simplified",
        "Matplotlib Anatomy: Line plots, bar charts, scatter regressions, and publication-ready figures"
      ],
      tag: "Data Science"
    }
  ],

  testimonials: [
    {
      name: "Rohit Verma",
      role: "B.Tech CSE (3rd Year)  -  Placed at Top MNC",
      initials: "RV",
      quote: "The visual diagram of the CPython 3.14 memory model and LEGB scope in this ebook made things click instantly! I had watched 40+ hours of video tutorials without truly understanding stack vs heap. Best Rs. 199 I have ever spent on my coding journey."
    },
    {
      name: "Diya Gupta",
      role: "BCA Final Year  -  Aspiring Data Scientist",
      initials: "DG",
      quote: "NumPy axis=0 vs axis=1 and Pandas DataFrame operations were always confusing until I saw the visual diagrams on page 275. This book gives you pure visual notes without fluff. Revised the entire 304-page syllabus in 2 days before my exam!"
    },
    {
      name: "Aditya Kulkarni",
      role: "Self-Taught Developer & Tech Aspirant",
      initials: "AK",
      quote: "The Big-O decision tree poster alone is worth 10x the price. In my technical coding interview, they asked about tuple mutation traps and list over-allocation growth, and I answered word-for-word from this notes kit. Highly recommended!"
    }
  ]
};

// Also alias pythonSamples for cleaner modern usage
PRODUCT_CONFIG.pythonSamples = PRODUCT_CONFIG.sqlSamples;

if (typeof window !== "undefined") {
  window.PRODUCT_CONFIG = PRODUCT_CONFIG;
}
