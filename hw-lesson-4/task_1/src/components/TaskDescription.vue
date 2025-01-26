<template>
    <div class="task-description section card">
        <h1>Урок №4. Ref. Watch. Components. Хуки життєвого циклу</h1>
        
        <div class="content">
            <section class="task">
                <h2>Задача 1. Спробуйте відтворити використовуючи відповідні компоненти</h2>
            </section>

            <section class="implementation">
                <h2>Використані концепції Vue.js</h2>
                
                <div class="concept">
                    <h3>🔄 Життєвий цикл компонентів</h3>
                    <ul>
                        <li><code>created</code> - завантаження даних з localStorage</li>
                        <li><code>mounted</code> - ініціалізація DOM-елементів</li>
                        <li><code>beforeUnmount</code> - очищення ресурсів</li>
                    </ul>
                </div>

                <div class="concept">
                    <h3>📌 Refs</h3>
                    <ul>
                        <li>Прямий доступ до DOM для анімацій</li>
                        <li>Автофокус на полях вводу</li>
                        <li>Керування контейнерами компонентів</li>
                    </ul>
                </div>

                <div class="concept">
                    <h3>👀 Watch</h3>
                    <ul>
                        <li>Відстеження змін фільтрів</li>
                        <li>Збереження стану в localStorage</li>
                        <li>Анімації при оновленні даних</li>
                    </ul>
                </div>

                <div class="features">
                    <h3>⚡ Ключові особливості</h3>
                    <ul>
                        <li>Динамічний пошук</li>
                        <li>Кешування даних в localStorage</li>
                        <li>Адаптивний дизайн</li>
                        <li>Анімації та переходи</li>
                    </ul>
                </div>
            </section>

            <section class="architecture">
                <h2>Архітектура додатку</h2>
                
                <div class="component-tree">
                    <h3>📦 Компоненти</h3>
                    <ul>
                        <li><code>App</code> - головний компонент
                            <ul>
                                <li><code>AppNavbar</code> - навігація</li>
                                <li><code>ProductManager</code> - управління товарами</li>
                                <li><code>ProductList</code> - список з фільтрами</li>
                                <li><code>ProductCard</code> - картка товару</li>
                                <li><code>ProductDetails</code> - деталі товару</li>
                            </ul>
                        </li>
                    </ul>
                </div>

            </section>
        </div>
    </div>
</template>

<style scoped>
.content {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
}

h1 {
    text-align: center;
    color: var(--primary-color);
    margin-bottom: 2rem;
}

section {
    margin-bottom: 3rem;
}

h2 {
    color: var(--secondary-color);
    border-bottom: 2px solid var(--primary-color);
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
}

h3 {
    color: var(--primary-color);
    margin: 1.5rem 0 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.task-title {
    font-weight: 500;
    color: var(--secondary-color);
    margin-bottom: 1rem;
}

.concept {
    background: #f8f9fa;
    border-radius: var(--border-radius);
    padding: 1rem 1.5rem;
    margin-bottom: 1rem;
}

code {
    background: #e9ecef;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: monospace;
    color: var(--secondary-color);
}

ul {
    list-style-type: none;
    padding-left: 1.5rem;
}

li {
    margin-bottom: 0.5rem;
    position: relative;
}

li::before {
    content: "→";
    position: absolute;
    left: -1.2rem;
    color: var(--primary-color);
}

.component-tree ul ul {
    margin: 0.5rem 0 1rem 1rem;
    color: #666;
}
</style>
