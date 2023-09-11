# Locker

A simple app to lock your PC (remotely). 
Client folder contains the files that you can put on the PC which you want to lock remotely. The server contains the files from which you wanted to lock your remote PC from. Things to know about your network are IP Addresses. ```Gateway``` is your router IP Address and Device IP Address. It can only lock your PC if your remote PC is in the same subnet.

### Usage

#### Client
     - app.exe [time] [ip] [port]
       - time: Time in seconds. e.g: 300 (5 minutes)
       - ip: IP Address of PC from which you want 
         the remote PC to be shutdown from. e.g: 
         192.168.0.3.
       - port: Default is 8630 at which Admin PC 
         will scan and the app is going to run on.


#### Server
     - Pre-built: 
       - To change $gateway head over to fil 
         about.....js and find $gateway variable
         having value something like: 192.168.0.
         change it to according to your local 
         IP like: 192.168.10.1 should be 192.168.10
        
     - Source Code: Simple VueJS app.
       - To change $gateway head over to main.ts.
       - To change Default Port to scan, head over
         to src/views/HomeView.vue and change lines:
         406, 328 and 345. Deafult is 8630.
       - To change number of PCs to scan in which
         default is 100. Head over to line 341.

---