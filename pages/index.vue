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
            <img src="~assets/Yin_yang.svg" width="20%" style="cursor: pointer" @click="sort">
          </v-col>
        </v-row>
      </v-card-actions>
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
        number: null
      },
    }
  },
  methods: {
    sort() {
      const number = this.getRandomArbitrary()
      this.chapter.lines = chapters[`ch${number}`]
      this.chapter.number = number
      console.log(this.chapter)
    },
    getRandomArbitrary(min = 1, max = 81) {
      return Math.floor(Math.random() * (max - min) + min);
    },
  }
}
</script>
