<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-flex md7 class="mx-auto">
          <v-col cols="12" md="12">
            <form @submit.prevent="Buscar">
              <label margin-left="10px">Cidade</label>
              <input type="text" placeholder="Cidade" v-model="infoData.city" />
              <label>Estado</label>
              <input
                type="text"
                placeholder="Estado"
                v-model="infoData.state"
              />
              <label>País</label>
              <v-select
                v-model="infoData.country"
                :items="items"
                item-text="country"
                item-value="abbr"
                label="Selecione o país"
                dense
                solo
              ></v-select>

              <button class="waves-effect waves-light btn-small">Buscar</button>
            </form>
          </v-col>
        </v-flex>
      </v-row>

      <v-card class="mx-auto" max-width="400">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline">
              {{ this.informations["city_name"] }}
              {{ this.informations["country_code"] }}
            </v-list-item-title>
            <v-list-item-subtitle
              >{{ this.informations["weather"]["description"]
              }}<span v-if="this.informations['pod']">, </span>
              <h9 v-if="this.informations['pod'] === 'd'">está de dia.</h9>
              <h9 v-else-if="this.informations['pod'] === 'n'"
                >está de noite.</h9
              >
              <h9 class="red--text" v-else>
                Cidade não encontrada, verifique se digitou tudo certo.</h9
              >
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
    </v-container>
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
      items: [
        { country: "Afeganistão", abbr: "AF" },
        { country: "África do Sul", abbr: "ZA" },
        { country: "Albânia", abbr: "AL" },
        { country: "Alemanha", abbr: "DE" },
        { country: "Andorra", abbr: "AD" },
        { country: "Angola", abbr: "AO" },
        { country: "Anguilla", abbr: "AI" },
        { country: "Antártida", abbr: "AQ" },
        { country: "Antígua e Barbuda", abbr: "AG" },
        { country: "Antilhas Holandesas", abbr: "AN" },
        { country: "Arábia Saudita", abbr: "SA" },
        { country: "Argélia", abbr: "DZ" },
        { country: "Argentina", abbr: "AR" },
        { country: "Armênia", abbr: "AM" },
        { country: "Aruba", abbr: "AW" },
        { country: "Austrália", abbr: "AU" },
        { country: "Áustria", abbr: "AT" },
        { country: "Azerbaijão", abbr: "AZ " },
        { country: "Bahamas", abbr: "BS" },
        { country: "Bahrein", abbr: "BH" },
        { country: "Bangladesh", abbr: "BD" },
        { country: "Barbados", abbr: "BB" },
        { country: "Belarus", abbr: "BY" },
        { country: "Bélgica", abbr: "BE" },
        { country: "Belize", abbr: "BZ" },
        { country: "Benin", abbr: "BJ" },
        { country: "Bermudas", abbr: "BM" },
        { country: "Bolívia", abbr: "BO" },
        { country: "Bósnia-Herzegóvina", abbr: "BA" },
        { country: "Botsuana", abbr: "BW" },
        { country: "Brasil", abbr: "BR" },
        { country: "Brunei", abbr: "BN" },
        { country: "Bulgária", abbr: "BG" },
        { country: "Burkina Fasso", abbr: "BF" },
        { country: "Burundi", abbr: "BI" },
        { country: "Butão", abbr: "BT" },
        { country: "Cabo Verde", abbr: "CV" },
        { country: "Camarões", abbr: "CM" },
        { country: "Camboja", abbr: "KH" },
        { country: "Canadá", abbr: "CA" },
        { country: "Cazaquistão", abbr: "KZ" },
        { country: "Chade", abbr: "TD" },
        { country: "Chile", abbr: "CL" },
        { country: "China", abbr: "CN" },
        { country: "Chipre", abbr: "CY" },
        { country: "Cingapura", abbr: "SG" },
        { country: "Colômbia", abbr: "CO" },
        { country: "Congo", abbr: "CG" },
        { country: "Coréia do Norte", abbr: "KP" },
        { country: "Coréia do Sul", abbr: "KR" },
        { country: "Costa do Marfim", abbr: "CI" },
        { country: "Costa Rica", abbr: "CR" },
        { country: "Croácia (Hrvatska)", abbr: "HR" },
        { country: "Cuba", abbr: "CU" },
        { country: "Dinamarca", abbr: "DK" },
        { country: "Djibuti", abbr: "DJ" },
        { country: "Dominica", abbr: "DM" },
        { country: "Egito", abbr: "EG" },
        { country: "El Salvador", abbr: "SV" },
        { country: "Emirados Árabes Unidos", abbr: "AE" },
        { country: "Equador", abbr: "EC" },
        { country: "Eritréia", abbr: "ER" },
        { country: "Eslováquia", abbr: "SK" },
        { country: "Eslovênia", abbr: "SI" },
        { country: "Espanha", abbr: "ES" },
        { country: "Estados Unidos", abbr: "US" },
        { country: "Estônia", abbr: "EE" },
        { country: "Etiópia", abbr: "ET" },
        { country: "Fiji", abbr: "FJ" },
        { country: "Filipinas", abbr: "PH" },
        { country: "Finlândia", abbr: "FI" },
        { country: "França", abbr: "FR" },
        { country: "Gabão", abbr: "GA" },
        { country: "Gâmbia", abbr: "GM" },
        { country: "Gana", abbr: "GH" },
        { country: "Geórgia", abbr: "GE" },
        { country: "Gibraltar", abbr: "GI" },
        { country: "Grã-Bretanha (Reino Unido, UK)", abbr: "GB" },
        { country: "Granada", abbr: "GD" },
        { country: "Grécia", abbr: "GR" },
        { country: "Groelândia", abbr: "GL" },
        { country: "Guadalupe", abbr: "GP" },
        { country: "Guam (Território dos Estados Unidos)", abbr: "GU" },
        { country: "Guatemala", abbr: "GT" },
        { country: "Guernsey", abbr: "G" },
        { country: "Guiana", abbr: "GY" },
        { country: "Guiana Francesa", abbr: "GF" },
        { country: "Guiné", abbr: "GN" },
        { country: "Guiné Equatorial", abbr: "GQ" },
        { country: "Guiné-Bissau", abbr: "GW" },
        { country: "Haiti", abbr: "HT" },
        { country: "Holanda", abbr: "NL" },
        { country: "Honduras", abbr: "HN" },
        { country: "Hong Kong", abbr: "HK" },
        { country: "Hungria", abbr: "HU" },
        { country: "Iêmen", abbr: "YE" },
        { country: "Ilha Bouvet (Território da Noruega)", abbr: "BV" },
        { country: "Ilha do Homem", abbr: "IM" },
        { country: "Ilha Natal", abbr: "CX" },
        { country: "Ilha Pitcairn", abbr: "PN" },
        { country: "Ilha Reunião", abbr: "RE" },
        { country: "Ilhas Aland", abbr: "AX" },
        { country: "Ilhas Cayman", abbr: "KY" },
        { country: "Ilhas Cocos", abbr: "CC" },
        { country: "Ilhas Comores", abbr: "KM" },
        { country: "Ilhas Cook", abbr: "CK" },
        { country: "Ilhas Faroes", abbr: "FO" },
        { country: "Ilhas Falkland (Malvinas)", abbr: "FK" },
        { country: "Ilhas Geórgia do Sul e Sandwich do Sul", abbr: "GS" },
        {
          country: "Ilhas Heard e McDonald (Território da Austrália)",
          abbr: "HM",
        },
        { country: "Ilhas Marianas do Norte", abbr: "MP" },
        { country: "Ilhas Marshall", abbr: "MH" },
        { country: "Ilhas Menores dos Estados Unidos", abbr: "UM" },
        { country: "Ilhas Norfolk", abbr: "NF" },
        { country: "Ilhas Seychelles", abbr: "SC" },
        { country: "Ilhas Solomão", abbr: "SB" },
        { country: "Ilhas Svalbard e Jan Mayen", abbr: "SJ" },
        { country: "Ilhas Tokelau", abbr: "TK" },
        { country: "Ilhas Turks e Caicos", abbr: "TC" },
        { country: "Ilhas Virgens (Estados Unidos)", abbr: "VI" },
        { country: "Ilhas Virgens (Inglaterra)", abbr: "VG" },
        { country: "Ilhas Wallis e Futuna", abbr: "WF" },
        { country: "índia", abbr: "IN" },
        { country: "Indonésia", abbr: "ID" },
        { country: "Irã", abbr: "IR" },
        { country: "Iraque", abbr: "IQ" },
        { country: "Irlanda", abbr: "IE" },
        { country: "Islândia", abbr: "IS" },
        { country: "Israel", abbr: "IL" },
        { country: "Itália", abbr: "IT" },
        { country: "Jamaica", abbr: "JM" },
        { country: "Japão", abbr: "JP" },
        { country: "Jersey", abbr: "JE" },
        { country: "Jordânia", abbr: "JO" },
        { country: "Kênia", abbr: "KE" },
        { country: "Kiribati", abbr: "KI" },
        { country: "Kuait", abbr: "KW" },
        { country: "Laos", abbr: "LA" },
        { country: "Látvia", abbr: "LV" },
        { country: "Lesoto", abbr: "LS" },
        { country: "Líbano", abbr: "LB" },
        { country: "Libéria", abbr: "LR" },
        { country: "Líbia", abbr: "LY" },
        { country: "Liechtenstein", abbr: "LI" },
        { country: "Lituânia", abbr: "LT" },
        { country: "Luxemburgo", abbr: "LU" },
        { country: "Macau", abbr: "MO" },
        { country: "Macedônia (República Yugoslava)", abbr: "MK" },
        { country: "Madagascar", abbr: "MG" },
        { country: "Malásia", abbr: "MY" },
        { country: "Malaui", abbr: "MW" },
        { country: "Maldivas", abbr: "MV" },
        { country: "Mali", abbr: "ML" },
        { country: "Malta", abbr: "MT" },
        { country: "Marrocos", abbr: "MA" },
        { country: "Martinica", abbr: "MQ" },
        { country: "Maurício", abbr: "MU" },
        { country: "Mauritânia", abbr: "MR" },
        { country: "Mayotte", abbr: "YT" },
        { country: "México", abbr: "MX" },
        { country: "Micronésia", abbr: "FM" },
        { country: "Moçambique", abbr: "MZ" },
        { country: "Moldova", abbr: "MD" },
        { country: "Mônaco", abbr: "MC" },
        { country: "Mongólia", abbr: "MN" },
        { country: "Montenegro", abbr: "ME" },
        { country: "Montserrat", abbr: "MS" },
        { country: "Myanma", abbr: "MM" },
        { country: "Namíbia", abbr: "NA" },
        { country: "Nauru", abbr: "NR" },
        { country: "Nepal", abbr: "NP" },
        { country: "Nicarágua", abbr: "NI" },
        { country: "Níger", abbr: "NE" },
        { country: "Nigéria", abbr: "NG" },
        { country: "Niue", abbr: "NU" },
        { country: "Noruega", abbr: "NO" },
        { country: "Nova Caledônia", abbr: "NC" },
        { country: "Nova Zelândia", abbr: "NZ" },
        { country: "Omã", abbr: "OM" },
        { country: "Palau", abbr: "PW" },
        { country: "Panamá", abbr: "PA" },
        { country: "Papua-Nova Guiné", abbr: "PG" },
        { country: "Paquistão", abbr: "PK" },
        { country: "Paraguai", abbr: "PY" },
        { country: "Peru", abbr: "PE" },
        { country: "Polinésia Francesa", abbr: "PF" },
        { country: "Polônia", abbr: "PL" },
        { country: "Porto Rico", abbr: "PR" },
        { country: "Portugal", abbr: "PT" },
        { country: "Qatar", abbr: "QA" },
        { country: "Quirguistão", abbr: "KG" },
        { country: "República Centro-Africana", abbr: "CF" },
        { country: "República Democrática do Congo", abbr: "CD" },
        { country: "República Dominicana", abbr: "DO" },
        { country: "República Tcheca", abbr: "CZ" },
        { country: "Romênia", abbr: "RO" },
        { country: "Ruanda", abbr: "RW" },
        { country: "Rússia (antiga URSS) - Federação Russa", abbr: "RU" },
        { country: "Saara Ocidental", abbr: "EH" },
        { country: "Saint Vincente e Granadinas", abbr: "VC" },
        { country: "Samoa Americana", abbr: "AS" },
        { country: "Samoa Ocidental", abbr: "WS" },
        { country: "San Marino", abbr: "SM" },
        { country: "Santa Helena", abbr: "SH" },
        { country: "Santa Lúcia", abbr: "LC" },
        { country: "São Bartolomeu", abbr: "BL" },
        { country: "São Cristóvão e Névis", abbr: "KN" },
        { country: "São Martim", abbr: "MF" },
        { country: "São Tomé e Príncipe", abbr: "ST" },
        { country: "Senegal", abbr: "SN" },
        { country: "Serra Leoa", abbr: "SL" },
        { country: "Sérvia", abbr: "RS" },
        { country: "Síria", abbr: "SY" },
        { country: "Somália", abbr: "SO" },
        { country: "Sri Lanka", abbr: "LK" },
        { country: "St. Pierre and Miquelon", abbr: "PM" },
        { country: "Suazilândia", abbr: "SZ" },
        { country: "Sudão", abbr: "SD" },
        { country: "Suécia", abbr: "SE" },
        { country: "Suíça", abbr: "CH" },
        { country: "Suriname", abbr: "SR" },
        { country: "Tadjiquistão", abbr: "TJ" },
        { country: "Tailândia", abbr: "TH" },
        { country: "Taiwan", abbr: "TW" },
        { country: "Tanzânia", abbr: "TZ" },
        { country: "Território Britânico do Oceano índico", abbr: "IO" },
        { country: "Territórios do Sul da França", abbr: "TF" },
        { country: "Territórios Palestinos Ocupados", abbr: "PS" },
        { country: "Timor Leste", abbr: "TP" },
        { country: "Togo", abbr: "TG" },
        { country: "Tonga", abbr: "TO" },
        { country: "Trinidad and Tobago", abbr: "TT" },
        { country: "Tunísia", abbr: "TN" },
        { country: "Turcomenistão", abbr: "TM" },
        { country: "Turquia", abbr: "TR" },
        { country: "Tuvalu", abbr: "TV" },
        { country: "Ucrânia", abbr: "UA" },
        { country: "Uganda", abbr: "UG" },
        { country: "Uruguai", abbr: "UY" },
        { country: "Uzbequistão", abbr: "UZ" },
        { country: "Vanuatu", abbr: "VU" },
        { country: "Vaticano", abbr: "VA" },
        { country: "Venezuela", abbr: "VE" },
        { country: "Vietnã", abbr: "VN" },
        { country: "Zâmbia", abbr: "ZM" },
        { country: "Zimbábue", abbr: "ZW" },
      ],

      informations: {
        city_name: "",
        country_code: "",
        weather: { descrition: "" },
        pod: "",
        temp: "",
        wind_spd: "",
        rh: "",
        app_temp: "",
        vis: "",
      },
    };
  },

  mounted() {
    this.Buscar();
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



