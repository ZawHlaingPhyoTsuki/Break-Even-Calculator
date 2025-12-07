<h1 align="center" id="title">Break-Even Calculator</h1>

<p align="center">
  <img src="https://socialify.git.ci/ZawHlaingPhyoTsuki/Break-Even-Calculator/image?custom_description=A+Next.js+application+for+calculating+business+break-even+points+in+Thai+Baht+%28THB%29&amp;description=1&amp;font=JetBrains+Mono&amp;language=1&amp;name=1&amp;owner=1&amp;pattern=Solid&amp;theme=Dark" alt="project-image">
</p>

<p align="center">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License">
    <img src="https://img.shields.io/badge/Next.js-15-black" alt="Next.js">
    <img src="https://img.shields.io/badge/TypeScript-5-blue" alt="TypeScript">
    <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC" alt="Tailwind CSS">
</p>

<br>

## 📖 About The Project

The **Break-Even Calculator** is a simple tool designed to help businesses determine the point at which their total revenues equal total costs. Understanding your break-even point is crucial for setting sales targets, pricing strategies, and ensuring financial stability.

This application is built with modern web technologies to ensure speed, accuracy, and a seamless user experience.

## 🚀 Features

- **Real-time Analysis**: Instantly calculate break-even points in units and revenue as you input data.
- **Scenario Comparison**: Create and compare multiple business scenarios side-by-side to evaluate different pricing or cost structures.
- **Interactive UI**: Clean, responsive interface built with Shadcn UI and Tailwind CSS.
- **Data Validation**: Robust form validation using Zod prevents calculation errors from incorrect inputs.
- **Currency Support**: Optimized for Thai Baht (THB) formatting, but adaptable for other currencies.
- **Dark Mode**: Native dark mode support for comfortable usage in any environment.

## 🛠️ Tech Stack

This project leverages the latest in web development:

- **Framework**: [Next.js 16](https://nextjs.org/) (App Directory & Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/)
- **Tooling**: [Biome](https://biomejs.dev/) (Linting & Formatting), [Pnpm](https://pnpm.io/)

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js**: Version 20 or higher is recommended.
- **Pnpm**: This project uses pnpm as the package manager.

  ```bash
  npm install -g pnpm
  ```

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/ZawHlaingPhyoTsuki/Break-Even-Calculator.git
    cd break-even-calculator
    ```

2.  **Install dependencies**

    ```bash
    pnpm install
    ```

3.  **Run the development server**

    ```bash
    pnpm dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 💻 Development Commands

We use standard commands to ensure code quality and stability:

| Command       | Description                                        |
| :------------ | :------------------------------------------------- |
| `pnpm dev`    | Starts the development server with Turbopack.      |
| `pnpm build`  | Builds the application for production.             |
| `pnpm start`  | Runs the built production application.             |
| `pnpm lint`   | Runs Biome to check for linting errors.            |
| `pnpm format` | Runs Biome to format code.                         |
| `pnpm check`  | Runs Biome check (lint, format, organize imports). |
| `pnpm test`   | Runs the Jest test suite.                          |

## 💡 Usage Guide

1.  **Enter Fixed Costs**: Input your monthly fixed expenses (e.g., Rent, Salaries, Insurance).
2.  **Enter Variable Costs**: Input costs per unit (e.g., Materials, Packaging).
3.  **Set Selling Price**: Input the price you plan to charge per unit.
4.  **View Results**: The dashboard will automatically update to show:
    - **Break-Even Units**: How many items you need to sell.
    - **Break-Even Revenue**: The total sales needed to cover costs.
    - **Contribution Margin**: How much each unit contributes to fixed costs.

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
