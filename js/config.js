/**
 * Product & Website Configuration Data
 */
var PRODUCT_CONFIG = {
  brandName: "SQL Mastery",
  badge: "2026 EDITION",
  currentPrice: 99,
  originalPrice: 1299,
  buyUrl: "https://superprofile.bio/vp/6aa90df8ecf1df0013c2c708",
  whatsappNumber: "+918595403030",
  whatsappDisplay: "+91-8595403030",
  supportEmail: "admin@xambuddy.in",
  
  sqlSamples: [
    {
      id: 0,
      title: "Unit 13: SQL Insert Statements",
      badge: "UNIT 13 • DML COMMANDS",
      sub: "The Two Core Syntax Forms: Safe vs Terse INSERT",
      image: "assets/sql/01_what_is_sql.webp",
      bullets: [
        "What is INSERT: Adds new rows of data to relational database tables (DML command)",
        "Syntax with Column Names: Safe approach that prevents breaks if table schema changes",
        "Syntax Without Column Names: Terse approach matching columns strictly by table definition order",
        "Exam Trap: Why omitting column lists is fragile and how column-list syntax protects production code"
      ],
      tag: "DML Core"
    },
    {
      id: 1,
      title: "Unit 4: Date & Time Data Types",
      badge: "UNIT 4 • DATA TYPES & FUNCTIONS",
      sub: "Core Date/Time Types, Special Types & Functions",
      image: "assets/sql/02_sql_sublanguages.webp",
      bullets: [
        "Core SQL Server Types: DATE, TIME, DATETIME, DATETIME2, SMALLDATETIME & DATETIMEOFFSET",
        "Exam Critical Distinction: DATETIME (from 1753) vs DATETIME2 (from 0001, 100ns precision)",
        "Special Date Types: TIMESTAMP vs ROWVERSION (versioning rows, not date/time)",
        "Exam Favorite Functions: GETDATE(), CURRENT_TIMESTAMP, YEAR(), MONTH(), DAY(), DATEPART()"
      ],
      tag: "Exam Favorite"
    },
    {
      id: 2,
      title: "Unit 13: Advanced INSERT Patterns",
      badge: "UNIT 13 • ADVANCED DML",
      sub: "INSERT ... SELECT, BY NAME & Schema Evolution",
      image: "assets/sql/03_core_concepts_constraints.webp",
      bullets: [
        "INSERT ... SELECT: Copying and populating data between tables with WHERE filtering",
        "2026 Update (BY NAME): Solves positional column matching errors in next SQL standard & PostgreSQL",
        "Databricks SQL 2026: WITH SCHEMA EVOLUTION for automatic schema adaptation on INSERT",
        "Why schema evolution enables AI-driven data pipelines where source structures change frequently"
      ],
      tag: "2026 Updates"
    },
    {
      id: 3,
      title: "Unit 14: SQL Joins Overview",
      badge: "UNIT 14 • RELATIONAL JOINS",
      sub: "What Are SQL Joins? The Complete Join Family Tree",
      image: "assets/sql/04_query_processing_select.webp",
      bullets: [
        "Fundamental Concept: Combining rows from two or more tables based on related columns",
        "Why We Need Joins: Normalization, minimizing data redundancy, and avoiding anomalies",
        "General Syntax: SELECT ... FROM table1 JOIN table2 ON search_condition (Equi-Join)",
        "The JOIN Family Tree: Inner Joins, Outer Joins (Left/Right/Full), and Special Joins (Cross/Self)"
      ],
      tag: "Core Concept"
    },
    {
      id: 4,
      title: "Unit 1: What is SQL?",
      badge: "UNIT 1 • FOUNDATIONS",
      sub: "The Language of Databases, RDBMS Architecture & History",
      image: "assets/sql/05_sql_joins_concept.webp",
      bullets: [
        "Declarative vs Imperative: You tell SQL what data you want, not how the engine gets it",
        "Codd's Relational Model (1970) & the birth of SEQUEL at IBM",
        "Standardized & Optimized: ANSI standards (1986) and high-volume dataset processing",
        "Modern Evolution (2020s): Microsoft SQL Server 2025, vector search, and cloud analytics"
      ],
      tag: "Core Foundation"
    },
    {
      id: 5,
      title: "Unit 14: Joins Comparison & Exam Prep",
      badge: "UNIT 14 • EXAM PREPARATION",
      sub: "Syntax Across Major Databases, Summary Table & Exam Checklist",
      image: "assets/sql/06_inner_join_match.webp",
      bullets: [
        "Cross-Database Matrix: Comparing join syntax across MySQL, PostgreSQL, SQL Server, Oracle & Databricks",
        "Exam Preparation Checklist: Essential concepts from Cartesian products to hash/merge joins",
        "Summary Table at a Glance: Returns, NULL handling, and practical use cases for every join type",
        "2026 Join Enhancements: SEMI/ANTI joins, joins in UPDATE/DELETE, and SQL:2023 MATCH"
      ],
      tag: "Exam Summary"
    },
    {
      id: 6,
      title: "Unit 14: LEFT OUTER JOIN",
      badge: "UNIT 14 • NULL HANDLING",
      sub: "LEFT OUTER JOIN: The Party Metaphor & Anti-Join Pattern",
      image: "assets/sql/07_left_outer_join.webp",
      bullets: [
        "Keeping the Left Side Complete: Preserving every row from Table 1 with automatic NULL padding",
        "The Party Metaphor: Everyone invited appears, with arrival times for those who attended",
        "Practical Query Example: Customer and Order tables with detailed ID and amount mapping",
        "The Famous Anti-Join Pattern: Finding 'Customers Who Never Placed An Order' using IS NULL"
      ],
      tag: "Anti-Join Pattern"
    }
  ],

  testimonials: [
    {
      name: "Diya Gupta",
      role: "BCA Final Year Student",
      quote: "The visual explanation of SQL JOINs and query execution order in this ebook is incredible. Concepts that 10 YouTube videos couldn't clarify were crystal clear in 5 minutes.",
      avatar: "assets/testimonial_diya.png"
    },
    {
      name: "Aman Sharma",
      role: "Aspiring Data Analyst",
      quote: "I was struggling with WHERE vs HAVING and PRIMARY vs FOREIGN KEY constraints. This ebook simplified everything with real-world examples and diagrams. Best ₹99 investment!",
      avatar: "assets/testimonial_rohit.png"
    }
  ]
};

if (typeof window !== "undefined") {
  window.PRODUCT_CONFIG = PRODUCT_CONFIG;
}

