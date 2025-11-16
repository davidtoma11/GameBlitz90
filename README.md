<p align="center">
  <img width="500" height="122" alt="Logo" src="https://github.com/user-attachments/assets/132fb602-7cf5-4287-aefd-841d77db4af3" />
</p>

<p align="center">
  <em>A modern web-based game collection crafted with classic web technologies</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" alt="Figma" />
  <img src="https://img.shields.io/badge/Adobe_Photoshop-31A8FF?style=for-the-badge&logo=adobephotoshop&logoColor=white" alt="Photoshop" />
  <img src="https://img.shields.io/badge/Adobe_Illustrator-FF9A00?style=for-the-badge&logo=adobeillustrator&logoColor=white" alt="Illustrator" />
</p>

---

## Project Overview

GameBlitz90 is a polished collection of classic web games redesigned for modern browsers. Each game is meticulously developed with **HTML5, CSS3, and vanilla JavaScript**, featuring custom loading animations, smooth interactions, and engaging audio feedback.

---

## Game Collection

<div align="center">
  <table>
    <tr>
      <td align="center" width="33%">
        <img src="https://github.com/user-attachments/assets/157a0a01-1ff1-49af-bcd2-8ee01808e539" alt="Tic-Tac-Toe" width="180" style="border-radius: 12px; box-shadow: 0 6px 16px rgba(0,0,0,0.12);" />
        <h3>Tic-Tac-Toe</h3>
      </td>
      <td align="center" width="33%">
        <img src="https://github.com/user-attachments/assets/e7ce1b15-746e-4d1b-90a7-1e33bf0feae9" alt="Connect 4" width="180" style="border-radius: 12px; box-shadow: 0 6px 16px rgba(0,0,0,0.12);" />
        <h3>4 in a Line</h3>
      </td>
      <td align="center" width="33%">
        <img src="https://github.com/user-attachments/assets/e6da6d08-81d5-4519-803f-bce507de1e63" alt="Simon Says" width="180" style="border-radius: 12px; box-shadow: 0 6px 16px rgba(0,0,0,0.12);" />
        <h3>Simon Says</h3>
      </td>
    </tr>
  </table>
</div>

---

## Technical Highlights

### Tic-Tac-Toe

<div>
  <img src="https://img.shields.io/badge/Animations-FF6B6B?style=for-the-badge" alt="Animations" />
  <img src="https://img.shields.io/badge/Score_Tracking-45B7D1?style=for-the-badge" alt="Score Tracking" />
  <img src="https://img.shields.io/badge/Win_Detection-96CEB4?style=for-the-badge" alt="Win Detection" />
</div>

* **Interactive 3×3 grid**
* **Automated win detection** with dynamic line rendering
* **Game-themed loading animation** with X/O motif

### 4 in a Line

<div>
  <img src="https://img.shields.io/badge/Physics_Driven-F78FB3?style=for-the-badge" alt="Physics Driven" />
  <img src="https://img.shields.io/badge/Multi-Directional_Wins-546DE5?style=for-the-badge" alt="Multi-Directional Wins" />
  <img src="https://img.shields.io/badge/Visual_Cues-574B90?style=for-the-badge" alt="Visual Cues" />
</div>

* **7×6 board** with realistic disc-drop animations
* **Win detection** for horizontal, vertical, and diagonal combinations
* **Loading animation** reflecting disc mechanics

### Simon Says

<div>
  <img src="https://img.shields.io/badge/Adaptive_Sequences-00B894?style=for-the-badge" alt="Adaptive Sequences" />
  <img src="https://img.shields.io/badge/Audio_Visual-00CEC9?style=for-the-badge" alt="Audio Visual" />
  <img src="https://img.shields.io/badge/Highscore_System-6C5CE7?style=for-the-badge" alt="Highscore System" />
</div>

* **Dynamic sequence generation** with escalating complexity
* **Integrated audio-visual cues** using WebAudio API
* **Loading interface** previews upcoming color sequences

---

## Design & UX

### Central Navigation Hub

* **Consistent design system** with unified visual language
* **Seamless game transitions** enhanced by custom loaders
* **Responsive layouts** across devices
* **Intuitive UI** with clear hierarchy and navigation

### Professional Features

* **Custom loading screens** tailored to each game
* **Graphics designed in Figma, Photoshop, and Illustrator**
* **Smooth micro-interactions and animations**
* **High-quality contextual sound design**

---

## Project Structure

```
GameBlitz90/
├── assets/
│   ├── visual_resources/         # Custom graphics and branding
│   ├── fonts/                    # Typography assets
│   ├── sounds/                   # Audio effects
├── scripts/                      # (+ styles)
│   ├── Tic-Tac-Toe/             
│   ├── 4InALine/                
│   ├── SimonSays/                
│   ├── gallery/                  # Main hub
│   └── loading_screens/          # Game-specific loaders
└── index.html                    # Main entry point                                   
```

---

## Getting Started

### Direct Launch

Open `index.html` in any modern browser.

### Local Server (recommended for full functionality)

```bash
python -m http.server 8000
# Or
npx live-server --port=8000
```

Access via: `http://localhost:8000`

---
