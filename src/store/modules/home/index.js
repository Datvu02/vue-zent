export default {
    namespaced: true,
    state: {
        labelShow: false,
        list: [],
        cardDetail:{},
        directories: [
            {
                "id": 1,
                "title": "Backlog",
                "card": [{
                        "id": 1,
                        "title": "Add discount code to checkout page",
                        "date": "Sep 14",
                        "type": "Feature Request"
                    },
                    {
                        "id": 2,
                        "title": "Provide documentation on integrations",
                        "date": "Sep 12"
                    },
                    {
                        "id": 3,
                        "title": "Design shopping cart dropdown",
                        "date": "Sep 9",
                        "type": "Design"
                    },
                ]
            },
            {
                "id": 2,
                "title": "In Progress",
                "card": [{
                        "id": 6,
                        "title": "Design shopping cart dropdown",
                        "date": "Sep 9",
                        "type": "Design"
                    },
                    {
                        "id": 7,
                        "title": "Add discount code to checkout page",
                        "date": "Sep 14",
                        "type": "Feature Request"
                    },
                    {
                        "id": 8,
                        "title": "Provide documentation on integrations",
                        "date": "Sep 12",
                        "type": "Backend"
                    }
                ]
            }
        ]
    },
    getters: {
        getList: (state) => (id) => {
            return state.list.find(list => list.id === id)
        }
    },
    mutations: {
        addCard(state, data) {
            state.list.find(list => list.id === data.list_id).cards.push(data.card)
        },
        showLable(state) {
            state.labelShow = !state.labelShow
        },
        updateList(state, list) {
            state.list = list;
        },
        updateCardDetail(state,card){
            state.cardDetail = card
        }
    },
}