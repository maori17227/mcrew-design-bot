# Website Flexbox & Theme Update

## ✅ Completed Changes

### 1. Flexbox Layout (Portfolio)
- **Переделано на flexbox** вместо grid
- **Контентная область**: max-width: 1600px, padding: 0 40px
- **Правильные пропорции**:
  - `.portfolio-category`: flex: 1 1 calc(33.333% - 20px), min-width: 320px, max-width: 480px
  - `.portfolio-item`: flex: 0 1 calc(33.333% - 20px), min-width: 320px, max-width: 480px
- **Центрирование**: justify-content: center
- **Контент НЕ обрезается** - элементы адаптируются к ширине экрана

### 2. Theme Switching (FIXED)
- **Добавлены console.log** для отладки
- **Улучшен event listener** - добавлен preventDefault и stopPropagation
- **Fallback для View Transitions** - работает в любом браузере
- **Применение темы при загрузке** - IIFE выполняется до DOMContentLoaded
- **Двойное применение** - на documentElement И body
- **Логотипы меняют цвет** - updateLogoColors() вызывается при каждой смене темы

### 3. Animations (Improved)
- **Улучшенный cubic-bezier**: 0.34, 1.56, 0.64, 1 (более плавный bounce)
- **Rotation на hover**: rotate(3deg) вместо 2deg
- **Анимация возврата назад**:
  - Все 3 категории анимируются с задержкой 150ms
  - translateY(60px) scale(0.9) → translateY(0) scale(1)
  - Transition: 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)
- **Overlay текст**:
  - translateY(30px) вместо 25px
  - Transition: 0.6s вместо 0.5s
  - Задержки: 0.1s для title, 0.2s для subtitle

### 4. Responsive
- **Mobile-first подход**
- **Breakpoints**: 1024px, 768px
- **Flexbox адаптируется** автоматически
- **Padding уменьшается** на мобильных: 0 10px

## 🎯 Key Features

1. **Контент не обрезается** - flexbox с центрированием и правильными размерами
2. **Тема работает** - с fallback и отладкой
3. **Плавные анимации** - cubic-bezier(0.34, 1.56, 0.64, 1)
4. **Логотипы меняют цвет** - черный на белом, белый на черном
5. **Все 3 категории анимируются** при возврате назад

## 🔧 Technical Details

### Flexbox Structure
```css
.portfolio-categories, .portfolio-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 40px;
}
```

### Theme Toggle
```javascript
function toggleTheme() {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.startViewTransition(() => applyTheme(newTheme));
    } else {
        applyTheme(newTheme);
    }
}
```

### Animation Timing
```javascript
categories.forEach((cat, index) => {
    setTimeout(() => {
        cat.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        cat.style.opacity = '1';
        cat.style.transform = 'translateY(0) scale(1)';
    }, index * 150); // 150ms stagger
});
```

## 📱 Testing

1. Open http://localhost:8000
2. Test theme toggle (sun icon in nav)
3. Check portfolio categories (no clipping)
4. Test back button animation (all 3 categories animate)
5. Test hover effects (smooth rotation)
6. Test responsive (resize window)

## 🎨 Design Notes

- **Style**: YSL/Yohji Yamamoto минимализм
- **Font**: Helvetica
- **Colors**: Liquid glass effects (backdrop-filter: blur(20px))
- **Borders**: border-radius: 24px
- **Shadows**: 0 30px 80px rgba(0, 0, 0, 0.4)
- **Transitions**: 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)

## ✨ Next Steps (Optional)

- [ ] Add loading skeleton for images
- [ ] Optimize image loading (lazy loading already implemented)
- [ ] Add keyboard navigation
- [ ] Add accessibility labels
- [ ] Test on different browsers
