<template>
  <nav>
    <div class="navbar">
      <div class="brand">
        <h1>One</h1>
      </div>
    </div>
  </nav>
  <router-view/>
</template>

<style>
:root {
  --bg-dark: #1a1a1a;
  --bg-dark-light: #242424;
  --bg-light: #f5f5f5;
  --bg-light-dark: #c3c3c3;
  --accent: #42b983;
}
*, body { padding: 0; margin: 0;}
::-webkit-scrollbar {
  display: none;
}
body {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', sans-serif;
  background-color: var(--bg-dark);
  color: var(--accent);
}


nav {
  background-color: var(--bg-dark-light);
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1;
}
nav .navbar {
  padding: 15px 10px;
  text-align: center;
}
nav .navbar .brand {
  font-size: 1.5rem;
  cursor: pointer;
  text-transform: uppercase;
}



a {
  font-weight: bold;
  color: var(--bg-light-dark);
  transition: 0.5s;
  text-decoration: none;
}
a:hover {
  color: var(--accent);
  transition: 0.5s;
}
</style>
