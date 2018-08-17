<template>
    <div class="map">
        <div class="google-map" id="map"></div>
    </div>
</template>

<script>
import firebase from 'firebase'

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
                zoom: 16,
                maxZoom: 20,
                minZoom: 3,
                streetViewControl: false
            })
        }
    },
    mounted(){
        // get users geo location
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(pos => {
                this.lat = pos.coords.latitude
                this.lng = pos.coords.longitude
                this.renderMap()
            }, (err)=> {
                console.log(err)
                this.renderMap()
            }, {maximumAge: 60000, timeout: 3000 })
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