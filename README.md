# IngrediSense
AI-Native Ingredient Co-Pilot

IngrediSense is an AI-powered ingredient analysis system designed to help users **understand food ingredient labels intelligently**, rather than just listing definitions.  
The system adapts its **reasoning, risk assessment, and explanations based on the user’s age group**, making food awareness more inclusive and practical.

##  Problem Statement

Most existing ingredient analysis tools:
- Simply explain ingredients in generic terms
- Do not consider age-specific health risks
- Lack contextual reasoning and prioritization
- Are not accessible or user-friendly for all age groups

Consumers often struggle to interpret ingredient labels and understand **what actually matters for them**.

##  Our Solution

IngrediSense acts as an **AI Co-Pilot** that:
- Reasons over ingredient lists
- Identifies potential health concerns
- Adjusts explanations based on **age group**
- Provides an intuitive, interactive interface
- Supports AI-generated insights rather than static data

##  Key Features

- **AI Reasoning Engine**  
  Interprets ingredient combinations instead of treating them independently.

- **Age-Aware Analysis**  
  Different risk priorities for children, adults, and senior citizens.

- **Ingredient Risk Scoring**  
  Categorizes overall food safety as *Low / Medium / High Risk*.

- **Dynamic UI**  
  Theme and background adapt based on selected age group.

- **AI Voice Assistant (Experimental)**  
  Converts explanations into voice output with age-based tone.

  -**Frontend–Backend Architecture**  
  Clean separation of UI and reasoning logic.

  **Flow:**  
User Input → Frontend UI → Backend Reasoning Engine → Risk Analysis → Explanation → UI + Voice Output

##  Tech Stack

### Frontend
- HTML
- CSS (Dynamic themes & animations)
- JavaScript (API integration, UI logic)

### Backend
- Python
- Flask (API server)
- Rule-based + heuristic AI reasoning

### Tools
- VS Code
- Git & GitHub
- Browser Speech Synthesis API

