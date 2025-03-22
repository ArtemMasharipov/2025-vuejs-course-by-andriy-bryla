<template>
  <div class="about">
    <div class="about-content">
      <h1>About Lesson Management System</h1>
      
      <section>
        <h2>What is this application?</h2>
        <p>
          The Lesson Management System allows students to select courses and preferred teachers 
          to create a personalized study plan. With an intuitive interface, you can quickly
          browse available lessons, assign the most suitable teachers, and generate a 
          comprehensive report of your selections.
        </p>
      </section>
      
      <section>
        <h2>How to use</h2>
        <ol>
          <li>Log in to your account</li>
          <li>Select lessons you're interested in</li>
          <li>Choose preferred teachers for each lesson</li>
          <li>Generate and review your personalized study plan</li>
        </ol>
      </section>
      
      <section>
        <h2>Technical Details</h2>
        <p>
          This application is built with Vue.js 3 using the Options API, Vuex for state management,
          and Vue Router for navigation. Data persistence is handled through localStorage.
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 30px;
}

section {
  margin-bottom: 30px;
}

h2 {
  margin-bottom: 15px;
  color: var(--color-heading);
}

ol {
  padding-left: 20px;
}

li {
  margin-bottom: 10px;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
