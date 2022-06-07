<template>
  <v-container>
    <v-card>
      <v-card-title class="justify-center amber--text red">
        Press to get a chapter!
      </v-card-title>
      <v-card-text v-if="chapter.lines" align="center">
        <h1 class="my-10">Chapter {{ chapter.number }}</h1>
        <p v-for="line in chapter.lines" :key="line" style="font-size: 18px">
          {{ line }}
        </p>
      </v-card-text>
      <v-card-actions>
        <v-row class="mt-1">
          <v-col align="center">
            <img class="image" src="~assets/Yin_yang.svg" width="20%" style="cursor: pointer" @click="sort(null)">
          </v-col>
        </v-row>
      </v-card-actions>
      <v-card-subtitle class="amber--text red">
        Or select by number:
        <v-select :items="chapters" @change="sort" />
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
import chapters from 'assets/chapters.json'

export default {
  name: 'IndexPage',
  data() {
    return {
      chapter: {
        lines: null,
        number: null,
      },
        chapters: [...Array(82).keys()].splice(1, 82)
    }
  },
  methods: {
    sort(selection) {
      const number = selection || this.getRandomArbitrary()
      this.chapter.lines = chapters[`ch${number}`]
      this.chapter.number = number
    },
    getRandomArbitrary(min = 1, max = 81) {
      return Math.floor(Math.random() * (max - min) + min);
    },
  }
}
</script>
<style scoped>
.image {
  -webkit-animation:spin 5s linear infinite;
  -moz-animation:spin 5s linear infinite;
  animation:spin 5s linear infinite;
}
@-moz-keyframes spin {
  100% { -moz-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  100% { -webkit-transform: rotate(360deg); }
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform:rotate(360deg);
  }
}
</style>
