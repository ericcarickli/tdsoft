<template>
  <div class="home">
    <div class="container">
      <form @submit.prevent="Buscar">
        <label>Cidade</label>
        <input type="text" placeholder="Cidade" v-model="infoData.city" />
        <label>Estado</label>
        <input type="text" placeholder="Estado" v-model="infoData.state" />
        <label>País</label>
        <v-select
          v-model="infoData.country"
          :items="items"
          label="Selecione o país"
          dense
          solo
        ></v-select>
        

        <button class="waves-effect waves-light btn-small">Buscar</button>
      </form>

      <v-card class="mx-auto" max-width="400">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline">
              {{ this.informations["city_name"] }}
              {{ this.informations["country_code"] }}
            </v-list-item-title>
            <v-list-item-subtitle
              >{{ this.informations["weather"]["description"] }},
              <h9 v-if="this.informations['pod'] === 'd'"
                >está de dia.</h9
              >
              <h9 v-else-if="this.informations['pod'] === 'n'">está de noite.</h9>
              <h9 v-else></h9>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-row align="center">
            <v-col class="display-2" cols="7">
              {{ this.informations["temp"] }}&deg;C
            </v-col>
            <v-col cols="5">
              <img :src="this.iconText" />
            </v-col>
          </v-row>
        </v-card-text>

        <v-list-item>
          <v-list-item-icon>
            <v-icon size="35">mdi-weather-windy</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{
            parseInt(this.informations["wind_spd"] * 3.6) + " km/h"
          }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon size="35">mdi-water-percent</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{
            this.informations["rh"] + "%"
          }}</v-list-item-subtitle>
        </v-list-item>

        <v-list>
          <v-list-item>
            <v-list-item-title>Sensação Térmica</v-list-item-title>
            <v-list-item-subtitle class="text-right">
              {{ this.informations["app_temp"] }}&deg;C
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
        <v-list>
          <v-list-item>
            <v-list-item-title>Direção do Vento</v-list-item-title>
            <v-list-item-subtitle class="text-right">
              {{ this.informations["wind_cdir_full"] }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
        <v-list>
          <v-list-item>
            <v-list-item-title>Visibilidade</v-list-item-title>
            <v-list-item-subtitle class="text-right">
              {{ this.informations["vis"] + " km" }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
      </v-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Climate from "../services/getClimate";

export default {
  name: "Home",

  data() {
    return {
      infoData: {
        city: "",
        state: "",
        country: "BR",
      },
      iconText: "",
      time: 0,
      items: ['Brasil', 'Estados Unidos da ', 'CA', 'UK'],

      informations: {
        city_name: '',
        country_code: "",
        weather: {descrition: ''},
        pod: '',
        temp: '',
        wind_spd: '',
        rh:'',
        app_temp:'',
        vis:''
      },
    };
  },

  mounted() {
    this.Buscar()
  },

  methods: {
    Buscar() {
      Climate.climate(this.infoData).then((resposta) => {
        let tudo = resposta.data;
        let esp = tudo.data;
        let climateInfo = esp[0];
        console.log(esp);
        this.informations = climateInfo;
        this.iconText =
          "https://www.weatherbit.io/static/img/icons/" +
          this.informations["weather"]["icon"] +
          ".png";
      });
    },
  },
};
</script>
