<template>
    <div class="map">
        <div class="google-map" id="map"></div>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
    name: 'GMap',
    data(){
        return{
            lat: 53,
            lng: -2
            }
    },
    methods: {
        renderMap(){
            console.log('test')
            const map = new google.maps.Map(document.getElementById('map'), {
                center:{
                    lat: this.lat, lng: this.lng
                },
                zoom: 8,
                maxZoom: 20,
                minZoom: 2,
                streetViewControl: true
            })

            db.collection('users').get()
            .then(users => {
                users.docs.forEach( doc => {
                    let data = doc.data()
                    if(data.geolocation){
                        // create the marker
                        let marker = new google.maps.Marker({
                            position: {
                                lat: data.geolocation.lat,
                                lng: data.geolocation.lng
                            },
                            map
                        })
                        // add click event to server. Note addListener is google maps API, not the JS addEVENTlistener
                        marker.addListener('click', () => {
                            console.log('doc.id is ' + doc.id);
                            this.$router.push({name: 'ViewProfile', params: {id: doc.id} })
                        })
                    }
                })
            })
        }
    },
    mounted(){
        // get current user
        let user = firebase.auth().currentUser;
        // console.log('id is ' + user.uid);

        // so cycle through records where user.user_id = 
        

        // get users geo location
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(pos => {
                this.lat = pos.coords.latitude
                this.lng = pos.coords.longitude
                
                // find the user record and update geo coords
                db.collection('users').where( 'user_id', '==', user.uid  ).get()
                .then( snapshot => {
                    snapshot.forEach((doc) => {
                        // console.log('user_id: ' + doc.id + ' looked up using user.uid: ' + user.uid);

                        // still in the foreach even though only one item probably, now update
                        db.collection('users').doc(doc.id).update({
                            geolocation: {
                                lat: pos.coords.latitude,
                                lng: pos.coords.longitude
                            }
                        })
                        
                    })
                }).then( () => {
                    // now all loaded, go for it!
                    this.renderMap()
                }) 

            }, (err)=> {
                console.log(err)
                this.renderMap()
            }, {maximumAge: 60000, timeout: 4000 })
        } else {
            // position centre by default values
            this.renderMap()
        }
        this.renderMap()
        console.log(firebase.auth().currentUser);
        
    },
}
</script>

<style>
.google-map {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}
</style>