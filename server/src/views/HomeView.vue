<template>
  <div class="home">

    <h1 class="heading">Your Computers</h1>

    <button class="scan-btn" @click="scan_computers()">Scan<span v-if="scanning > 0">ning...</span></button>
    <progress v-if="scanning > 0" :value="scanning" max="100"> {{scanning}}% </progress>

    <div class="computers_container">

      <div class="computer_card" v-for="computer in computers">
        <span class="close-btn" @click="delete_computer(computer.ip)">&times;</span>
        <div class="image">
          <img :src="desktop" alt="">
        </div>
        <h3 class="ipaddress">{{ computer.ip }}</h3>
        <input type="number" placeholder="Time in seconds..." v-model="time">
        <button class="btn" @click="set_time(computer.ip)">Set Time</button>
        <span class="status active" @click="get_time(computer.ip)" v-if="computer.status == 'online'"><span class="circle"></span>
          {{ computer.status }}</span>
        <span class="status warn" @click="get_time(computer.ip)" v-else-if="computer.status == 'idle'"><span class="circle"></span>
          {{ computer.status }}</span>
        <span class="status danger" @click="get_time(computer.ip)" v-else-if="computer.status == 'offline'"><span class="circle"></span>
          {{ computer.status }}</span>
        <div id="log">
          <li>{{ computer.log }}</li>
        </div>
      </div>

      <div class="computer_card" @click="toggle_modal()">
        <div class="add_symbol">
          <span class="vertical"></span>
          <span class="horizontol"></span>
        </div>
      </div>

    </div>

    <div class="add_computer_modal" v-if="is_modal_visible">
      <span class="close-btn" @click="toggle_modal()">&times;</span>
      <input type="text" placeholder="IP Address" v-model="form.ip">
      <input type="number" placeholder="Port" v-model="form.port">
      <button class="btn" @click="add_computer()">Add</button>
    </div>

  </div>
</template>

<style>
.home {
  text-align: center;
}

.home .heading {
  font-size: 2rem;
  margin: 5%;
  margin-top: 10%;
}

.home .scan-btn {
  position: absolute;
  top: 15%;
  right: 5%;
  background-color: var(--accent);
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 8px;
}

.home .computers_container {
  margin: 5% 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.home .computer_card {
  padding: 20px;
  position: relative;
  margin: 8px;
  border-radius: 14px;
  background-color: var(--bg-dark-light);
}

.home .computer_card .close-btn {
  cursor: pointer;
  position: absolute;
  top: 3%;
  right: 5%;
}

.home .computer_card .image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.home .computer_card .image img {
  width: 100px;
  padding-bottom: 10px;
  aspect-ratio: 1/1;
  cursor: pointer;
  filter: invert(58%) sepia(58%) saturate(404%) hue-rotate(101deg) brightness(95%) contrast(91%);
  transition: 0.5s;
}

.home .computer_card .image img:hover {
  opacity: 0.7;
  transition: 0.5s;
}

.home .computer_card input {
  outline: none;
  border: 1px solid var(--accent);
  background-color: var(--bg-dark);
  padding: 10px 15px;
  display: block;
  margin: 14px 0px;
  border-radius: 8px;
  color: var(--bg-light-dark);
}

.home .computer_card input::placeholder {
  color: var(--bg-light-dark);
}

.home .computer_card .btn {
  padding: 10px 15px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin: 4px 14px;
  border: none;
  transition: 0.5s;
  background-color: var(--accent);
}

.home .computer_card .btn:hover {
  opacity: 0.7;
  transition: 0.5s;
}

.home .computer_card .status {
  font-size: 12px;
  text-decoration: underline;
  text-underline-offset: 4px;
  cursor: pointer;
}

.home .computer_card .status .circle {
  display: inline-block;
  width: 8px;
  aspect-ratio: 1/1;
  border-radius: 100%;
}

.home .computer_card .status.active {
  color: var(--accent);
}

.home .computer_card .status.active .circle {
  background-color: var(--accent);
}

.home .computer_card .status.warn {
  color: rgb(255, 165, 0);
}

.home .computer_card .status.warn .circle {
  background-color: rgb(255, 165, 0);
}

.home .computer_card .status.danger {
  color: rgb(215, 50, 50);
}

.home .computer_card .status.danger .circle {
  background-color: rgb(215, 50, 50);
}

.home .computer_card {
  position: relative;
  width: 200px;
  aspect-ratio: 1/1;
}

.home .computer_card .horizontol {
  background-color: var(--bg-dark);
  cursor: pointer;
  width: 150px;
  aspect-ratio: 4/1;
  top: 43%;
  border-radius: 14px;
  left: 20%;
  position: absolute;
}

.home .computer_card .vertical {
  background-color: var(--bg-dark);
  height: 150px;
  aspect-ratio: 1/4;
  top: 20%;
  border-radius: 14px;
  left: 43%;
  position: absolute;
}

.home .computer_card #log {
  padding: 10px 15px;
  margin-top: 15%;
  border-radius: 8px;
  display: block;
  color: var(--accent);
  border: 1px solid var(--bg-light-dark);
  background-color: var(--bg-dark);
}
.home .computer_card #log li {
  list-style: none;
  font-size: 10px;
  text-align: left;
  margin: 4px 0px;
}

.home .add_computer_modal {
  position: fixed;
  top: 10%;
  left: 35%;
  width: 20%;
  height: 60px;
  background-color: var(--bg-dark-light);
  padding: 60px;
  border-radius: 14px;
  border: 1px solid #fff;
  z-index: 2;
}

.home .add_computer_modal .close-btn {
  cursor: pointer;
  position: absolute;
  top: 5%;
  right: 5%;
}

.home .add_computer_modal .btn {
  display: block;
  border: none;
  padding: 10px 15px;
  background-color: var(--accent);
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  margin: 8px 0px;
}

.home .add_computer_modal input {
  outline: none;
  border: 1px solid var(--accent);
  background-color: var(--bg-dark);
  padding: 10px 15px;
  display: inline;
  color: var(--accent);
}

.home .add_computer_modal input[type=text] {
  width: 145px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.home .add_computer_modal input[type=number] {
  width: 60px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

progress {
  accent-color: var(--accent);
  width: 95px;
  position: absolute;
  top: 20%;
  right: 5%;
}

@media screen and (max-width:768px) {
  .home .add_computer_modal {
    width: 60%;
    left: 0;
  }
}
</style>

<script>

import computer from '../assets/desktop.svg';

export default {
  name: 'HomeView',
  data() {
    return {
      desktop: computer,
      is_modal_visible: false,
      form: {
        ip: '',
        port: '8630'
      },
      time: 60,
      scanning: 0,
      computers: [
        { ip: '192.168.0.17', status: "online", port: 8630, log:""}
      ]
    }
  },

  methods: {

    toggle_modal: function () {
      this.is_modal_visible = !this.is_modal_visible;
    },

    add_computer: function () {
      let new_computer = this.form;
      new_computer.status = "offline";
      this.computers.push(new_computer);
      this.form = {
        ip: '',
        port: '8630'
      }
      this.toggle_modal();
    },

    delete_computer: function (ip) {
      let computer = this.computers.find(computer => computer.ip == ip);
      this.computers.splice(this.computers.indexOf(computer), 1);
    },

    scan_computers: async function () {
      if(this.scanning > 0) return;
      this.computers = [];
      for (let i = 2; i < 102; i++) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 1000);
        let ip = `${this.$gateway}.${i}`;
        let port = 8630;
        let url = `http://${ip}:${port}/`;
        await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'text/plain'
          },
          signal: controller.signal
        })
          .then(res => {
            if (res.status == 200) {
              this.computers.push({
                ip: ip,
                status: "idle",
                port: port
              });
            }
          })
          .catch(err => {
            console.log(err);
          })
        clearTimeout(id);

        this.scanning = i;
      }
      this.scanning = 0;
    },

    get_time: async function(ip_address) {
      let computer = this.computers.find(computer => computer.ip == ip_address);
      let url = `http://${ip_address}:${computer.port}/`;
      await fetch(url, {
        method: 'GET',
        // headers: {
        //   'Content-Type': 'application/json'
        // }
      })
        .then(res => {
          if (res.status == 200) {
            return res.json();
          }
        })
        .then(data => {
          computer.status = data.status;
          computer.log = `${data.status}, Locking in ${data.time} seconds`;
        })
        .catch(err => {
          console.log(err);
          computer.log = `Went Offline`;
          computer.status = "offline";
        })
    },

    set_time: async function(ip_address) {
      let computer = this.computers.find(computer => computer.ip == ip_address);
      let url = `http://${ip_address}:${computer.port}/lock`;
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          time: this.time
        })
      })
        .then(res => {
          if (res.status == 200) {
            return res.json();
          }
        })
        .then(data => {
          computer.status = data.status;
          computer.log = `${data.status}, Locking in ${data.time} seconds`;
        })
        .catch(err => {
          console.log(err);
          computer.log = `Went Offline`;
          computer.status = "offline";
        })
    }

  }

}

</script>


