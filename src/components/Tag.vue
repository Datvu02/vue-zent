<template>
    <div class="row">
        <draggable class="list-group-box" :list="list" group="people" @change="log">
            <div class="able1" v-for="(valueParent, indexParent) in list" :key="indexParent" :id="valueParent.id">
                <h2> {{ valueParent.title }} </h2>
                <draggable class="list-group" :list="valueParent.cards" group="people" :move="changeIndex">
                    <div class="list-group-item" v-for="(element) in valueParent.cards" :key="element.id">
                        {{ element.title }}
                    </div>
                </draggable>
            </div>
        </draggable>
    </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "TagView",
  components: {
    draggable
  },
  data() {
    return {
      list: [
        {
          "id": 1,
          "title": "group 1",
          "user_id": 110,
          "index": 1,
          "created_at": "2022-08-03T11:14:27.000000Z",
          "updated_at": "2022-08-03T11:14:27.000000Z",
          "cards": [
            {
              "id": 822,
              "title": "task 1",
              "description": null,
              "status": null,
              "directory_id": 649,
              "index": 0,
              "deadline": null,
              "user_id": 110,
              "created_at": "2022-08-03T11:14:41.000000Z",
              "updated_at": "2022-08-03T11:14:43.000000Z",
              "labels": []
            },
            {
              "id": 823,
              "title": "task 2",
              "description": null,
              "status": null,
              "directory_id": 649,
              "index": 1,
              "deadline": null,
              "user_id": 110,
              "created_at": "2022-08-03T12:22:35.000000Z",
              "updated_at": "2022-08-03T12:22:35.000000Z",
              "labels": []
            },
            {
              "id": 824,
              "title": "task 3",
              "description": null,
              "status": null,
              "directory_id": 649,
              "index": 2,
              "deadline": null,
              "user_id": 110,
              "created_at": "2022-08-03T12:22:37.000000Z",
              "updated_at": "2022-08-03T12:22:37.000000Z",
              "labels": []
            },
            {
              "id": 825,
              "title": "task 4",
              "description": null,
              "status": null,
              "directory_id": 649,
              "index": 3,
              "deadline": null,
              "user_id": 110,
              "created_at": "2022-08-03T12:22:39.000000Z",
              "updated_at": "2022-08-03T12:22:39.000000Z",
              "labels": []
            }
          ]
        },
        {
          "id": 2,
          "title": "group 2",
          "user_id": 110,
          "index": 1,
          "created_at": "2022-08-03T11:14:29.000000Z",
          "updated_at": "2022-08-03T11:14:29.000000Z",
          "cards": [
            {
              "id": 821,
              "title": "task 5",
              "description": null,
              "status": null,
              "directory_id": 650,
              "index": 0,
              "deadline": null,
              "user_id": 110,
              "created_at": "2022-08-03T11:14:39.000000Z",
              "updated_at": "2022-08-03T11:14:43.000000Z",
              "labels": []
            },
            {
              "id": 826,
              "title": "task 6",
              "description": null,
              "status": null,
              "directory_id": 650,
              "index": 1,
              "deadline": null,
              "user_id": 110,
              "created_at": "2022-08-03T12:22:43.000000Z",
              "updated_at": "2022-08-03T12:22:43.000000Z",
              "labels": []
            },
            {
              "id": 827,
              "title": "task 7",
              "description": null,
              "status": null,
              "directory_id": 650,
              "index": 2,
              "deadline": null,
              "user_id": 110,
              "created_at": "2022-08-03T12:22:45.000000Z",
              "updated_at": "2022-08-03T12:22:45.000000Z",
              "labels": []
            },
            {
              "id": 828,
              "title": "task 8",
              "description": null,
              "status": null,
              "directory_id": 650,
              "index": 3,
              "deadline": null,
              "user_id": 110,
              "created_at": "2022-08-03T12:22:47.000000Z",
              "updated_at": "2022-08-03T12:22:47.000000Z",
              "labels": []
            }
          ]
        }
      ],
    };
  },
};
</script>

<style  scoped>
.list-group-box{
    display: flex;
}
</style>