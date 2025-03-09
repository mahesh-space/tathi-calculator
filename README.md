# Compound Interest Calculator with Tithi Method

## Overview
This project is a **Compound Interest Calculator** that integrates the traditional **Tithi method** of Hindu timekeeping. It allows users to calculate compound interest while measuring time using Tithis (lunar days) and accounts for **Adhik Maas** (extra months) for precise calculations. The tool is designed to bridge modern financial practices with ancient cultural wisdom, offering a unique and meaningful user experience.

---

## Features
1. **Compound Interest Calculator**:
   - Calculate compound interest using the Tithi method for timekeeping.
   - Supports different compounding frequencies (annually, quarterly, monthly).

2. **Tithi Method Integration**:
   - Time is measured in Tithis (lunar days) instead of standard solar days.
   - Accounts for **Adhik Maas** (extra months) to ensure precise calculations.

3. **Hybrid Interest Calculation**:
   - Uses **simple interest** for durations less than 1 year.
   - Uses **compound interest** for durations of 1 year or more.

4. **Responsive Design**:
   - Works seamlessly on desktop, tablet, and mobile devices.
   - Includes a **hamburger menu** for mobile navigation.

5. **Dynamic Visualization**:
   - Displays a chart to visualize the growth of the investment over time.

6. **Educational Content**:
   - Includes an **About** page and a **Tithi Method** page to provide context and cultural significance.

---

## How It Works
1. **Inputs**:
   - Enter the **principal amount**, **annual interest rate**, and **compounding frequency**.
   - Select the **start date** and **end date** using the Tithi-based calendar (year, month, Paksha, and Tithi).

2. **Time Calculation**:
   - The tool calculates the total time period in **Tithis** (lunar days).
   - Adjusts for **Adhik Maas** (extra months) to ensure accuracy.

3. **Interest Calculation**:
   - For durations less than 1 year, the tool uses the **simple interest formula**:
     \[
     \text{Interest} = \frac{P \times R \times T}{100}
     \]
   - For durations of 1 year or more, the tool uses the **compound interest formula**:
     \[
     \text{Amount} = P \times \left(1 + \frac{R}{n \times 100}\right)^{n \times T}
     \]
     Where:
     - \( P \) = Principal amount
     - \( R \) = Annual interest rate
     - \( T \) = Time in years
     - \( n \) = Compounding frequency

4. **Results**:
   - Displays the total amount, interest earned, and time period.
   - Shows a chart to visualize the growth of the investment.

---

## Pages
1. **Home**:
   - Introduction to the tool and its features.

2. **Calculator**:
   - The main calculator interface for calculating compound interest.

3. **Tithi Method**:
   - Explains the Tithi system, its cultural significance, and how it is used in the calculator.

4. **About**:
   - Provides context about the tool, its purpose, and the motivation behind combining modern finance with traditional timekeeping.

---

## File Structure
```
project-root/
├── index.html                # Home page
├── calculator.html           # Calculator page
├── tithi-method.html         # Tithi Method page
├── about.html                # About page
├── styles/
│   └── main.css              # CSS for styling
└── scripts/
    └── calculator.js         # JavaScript for calculator logic
```

---

## Technologies Used
- **HTML5**: Structure of the web pages.
- **CSS3**: Styling and responsive design.
- **JavaScript**: Logic for interest calculations and dynamic chart updates.
- **Chart.js**: Library for visualizing the growth of the investment.

---

## How to Run the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/mahesh-space/tathi-calculator.git
   ```
2. Navigate to the project directory:
   ```bash
   cd tathi-calculator
   ```
3. Open the `index.html` file in your browser:
   ```bash
   open index.html
   ```

---

## Screenshots
### Desktop View
![image](https://github.com/user-attachments/assets/9c6adca9-a303-4719-8c99-7ccb98aff4a9)




### Calculator Page
![image](https://github.com/user-attachments/assets/37689b4e-a099-434e-be59-c993aada0cfe)


### Tithi Method Page
![image](https://github.com/user-attachments/assets/e268b268-4fb3-4943-9b39-5d9ba37283a9)


### About Page
![image](https://github.com/user-attachments/assets/877e3aaa-7f0d-43f1-a87f-ac7b057690ad)


---

## Future Enhancements
1. **Dynamic Adhik Maas Calculation**:
   - Automatically calculate Adhik Maas based on astronomical data.
2. **Localization**:
   - Support multiple languages for Tithi and month names.
3. **User Accounts**:
   - Allow users to save and track their calculations.
4. **API Integration**:
   - Fetch real-time interest rates or historical data for more accurate calculations.

---

## Contributing
Contributions are welcome! If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Submit a pull request.

---

## License
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## Contact
For questions or feedback, please contact:
- **Mahesh**
- **Email**: jiwanamahesh@gmail.com
- **GitHub**: [your-username](https://github.com/mahesh-space)

---

Thank you for using the Compound Interest Calculator with Tithi Method! We hope you find it both useful and culturally enriching. 🌙📈
