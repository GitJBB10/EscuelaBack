<template>
  <v-navigation-drawer app>
    <v-list dense>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        @click="toggleSubmenu(item)"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-icon>
            <v-icon>{{ item.subItems ? (item.open ? 'mdi-chevron-up' : 'mdi-chevron-down') : '' }}</v-icon>
          </v-list-item-icon>
        </v-list-item-content>
      </v-list-item>
      <v-expand-transition>
        <v-list v-if="item.open" dense>
          <v-list-item
            v-for="subItem in item.subItems"
            :key="subItem.title"
            :to="subItem.link"
          >
            <v-list-item-content>
              <v-list-item-title>{{ subItem.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-expand-transition>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Option 1',
          subItems: [
            { title: 'Suboption 1-1', link: '/suboption-1-1' },
            { title: 'Suboption 1-2', link: '/suboption-1-2' },
          ],
          open: false,
        },
        {
          title: 'Option 2',
          subItems: [
            { title: 'Suboption 2-1', link: '/suboption-2-1' },
            { title: 'Suboption 2-2', link: '/suboption-2-2' },
          ],
          open: false,
        },
      ],
    };
  },
  methods: {
    toggleSubmenu(item) {
      item.open = !item.open;
    },
  },
};
</script>

<style scoped>
.v-list-item-icon {
  margin-right: 8px;
}
</style>
