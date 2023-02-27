<template>
  <v-container>
    <v-card>
      <v-card-text align="center">
        <v-avatar>
          <img
              class="image"
              src="~assets/Yin_yang.svg"
              style="cursor: pointer"
              @click="random"
          />
        </v-avatar>
      </v-card-text>
      <div v-if="chapter.number">
        <v-card-text align="center">
          <h1 class="my-5 notranslate">{{ chapter.number }}</h1>
        </v-card-text>
        <v-card-text v-if="chapter.lines" align="center">
          <div v-for="line in chapter.lines" :key="line" style="line-height: 3vh">
            {{ line }}
          </div>
        </v-card-text>
      </div>
    </v-card>
    <div class="my-5" />
    <v-card>
      <v-card-text>
        Find a chapter containing a word
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">mdi-information-outline</v-icon>
          </template>
          <span>Only english words for now</span>
        </v-tooltip>
        <v-text-field v-model="query" append-icon="mdi-magnify" @click:append="find()"></v-text-field>
      </v-card-text>
    </v-card>
    <div class="my-5"/>
    <v-card>
      <v-card-text>
        Or select by number
        <v-select :items="chapters" @change="selection" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import chapters from 'assets/chapters.json'

export default {
  name: 'IndexPage',
  data() {
    return {
      query: null,
      alt_over: false,
      chapter: {
        lines: null,
        number: null,
      },
      chapters: [...Array(82).keys()].splice(1, 82),
    }
  },
  methods: {
    random() {
      const number = this.getRandomArbitrary()
      this.chapter.lines = chapters[`ch${number}`]
      this.chapter.number = number
    },
    selection(chapter) {
      this.chapter.lines = chapters[`ch${chapter}`]
      this.chapter.number = chapter
    },
    getRandomArbitrary(min = 1, max = 81) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    find() {
      if (!this.query) return
      Object.keys(chapters).forEach((chapter, index) => {
        if (chapters[chapter].find((line) => line.includes(this.query))) {
          this.chapter.lines = chapters[chapter]
          this.chapter.number = index + 1
        }
      })
    },
  },
}
</script>
<style scoped>
.image {
  -webkit-animation: spin 5s linear infinite;
  -moz-animation: spin 5s linear infinite;
  animation: spin 5s linear infinite;
}
.v-card__text {
  font-size: 2vh;
}
@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
