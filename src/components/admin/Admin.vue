<template>
<AdminLayout>
    <template #main>
        <div class="adminMainContent">
            <div class="main-content">
                <div class="listTodo">
                    <draggable class="dragArea" :list="list" item-key="id" :animation="100" :move="moveList">
                        <Directories v-for="(item,index) in list" :id="item.id" @openQuickEdit="openQuickEdit" @closeControlModal="closeControlModal" :key="index" @updateCardList="getDataList" @updateListTitle="handleUpdateList" @openActionList="openActionList" @openDetailCard="openDetailCard" :index="item.index" :item="item" />
                    </draggable>

                    <div class="newList" v-if="!addList">
                        <div class="btn-add" @click="newList">
                            <i class="el-icon-plus plus"></i>
                            <span>Thêm danh sách khác</span>
                        </div>
                    </div>
                    <NewList v-if="addList" @addList="handleAddList" @closeNewList="closeNewList"></NewList>
                </div>
            </div>
        </div>
        <ModalSidebar v-if="showControlModalSidebar" @searchLabel="searchDatalabel" :card="card" :labels="labels" @closeLabelModal="closeControlModal" :offset="offset" @reloadLabel="reloadLabel" />
        <EditCard v-if="showCardEdit" @updateCard="editCardTitle" @showControl="handleShowControl" @deleteCard="deleteCard" @closeCardEdit="closeCardEdit" @showMove="showMove" :card="card" :offset="offsetEdit" @openModal="openDetailCard" @updateCardList="getDataList" />
        <el-dialog v-if="dialogFormVisible" id="detailTodo" class="dialogTodo" :append-to-body="true" width="40%" :show-close="false" :visible.sync="dialogFormVisible" @close="closeModal">
            <div class="window-wrapper js-tab-parent" data-elevation="1"><a class="icon-md icon-close close-button js-close-window" @click="closeModal"><i class="iconColse el-icon-close"></i></a>
                <div class="card-detail-window u-clearfix">
                    <div class="window-header"><span class="window-header-icon"><i class="iconBank el-icon-bank-card"></i></span>
                        <div class="window-title">
                            <textarea @keydown.enter="updateCardTitle" :value="cardTitle"></textarea>
                        </div>
                    </div>
                    <div class="window-content">
                        <div class="window-main-col">
                            <div class="card-detail-data u-gutter">
                                <div v-if="cardDetail.labels.length>0" class="card-detail-item card-detail-item-labels u-clearfix js-card-detail-labels">
                                    <h3 class="card-detail-item-header">Nhãn</h3>
                                    <div class="u-clearfix js-card-detail-labels-list js-edit-label">
                                        <span v-for="(item,index) in cardDetail.labels" :key="index" @click="openControlLabel" :class="['card-label-'+item.color]" class="card-label" :title="item.name">
                                            <span class="label-text">{{ item.name }}</span>
                                        </span>
                                        <a class="card-detail-item-add-button" @click="openControlLabel">
                                            <span class="icon-sm icon-add"><i class="el-icon-plus"></i></span>
                                        </a>
                                    </div>
                                </div>
                                <div v-if="cardDetail.deadline!=null" class="card-detail-item card-detail-due-date">
                                    <h3 class="card-detail-item-header">Ngày hết hạn</h3>
                                    <div class="card-detail-due-date-badge js-card-detail-due-date-badge is-clickable is-due-complete" title="Thẻ này đã hoàn tất.">
                                        <el-checkbox v-model="isComplete" @change="changeStatusTodo"></el-checkbox>
                                        <div class="card-detail-badge-due-date-react-container">
                                            <div class="card-deadline-badge">
                                                <button class="deadline-badge datetime-btn" data-test-id="due-date-badge-with-date-range-picker" type="button">
                                                    <span>{{ formatDate(deadline) }}</span>
                                                    <span class="card-deadline-status card-complate" v-if="isComplete">Hoàn tất</span>
                                                    <span class="card-deadline-status card-die" v-if="!isComplete && isDeadline===2">Quá hạn</span>
                                                    <span class="card-deadline-status card-near-die" v-if="!isComplete && isDeadline===1">Gần đến hạn</span>
                                                    <span class="nch-icon">
                                                        <span class="" role="img" aria-label="DownIcon"><svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24">
                                                                <path d="M11.293 16.707l-7.071-7.07a1 1 0 111.414-1.415L12 14.586l6.364-6.364a1 1 0 111.414 1.414l-7.07 7.071a1 1 0 01-1.415 0z" fill="currentColor"></path>
                                                            </svg></span></span>
                                                    <el-date-picker type="datetime" v-model="deadline" @change="changeDeadlineModal">
                                                    </el-date-picker>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="plugin-detail-badges js-plugin-badges">
                                    <div></div>
                                </div>
                                <div class="u-clearfix"></div>
                            </div>
                            <div class="fill-card-detail-desc">
                                <div>
                                    <div class="window-module">
                                        <div class="window-module-title window-module-title-no-divider description-title">
                                            <span class="icon-description icon-lg window-module-title-icon">
                                                <i class="el-icon-s-unfold"></i>
                                            </span>
                                            <h3 class="u-inline-block">Mô tả</h3>
                                            <div class="editable" attr="desc"><a class="nch-button ml-4 hide-on-edit js-show-with-desc js-edit-desc js-edit-desc-button hide" @click="openEditDescription" v-if="!editDescriptionModal && cardDetail.description !=null">Chỉnh
                                                    sửa</a><span class="editing-members-description js-editing-members-description hide"></span></div>
                                        </div>
                                        <div class="u-gutter">
                                            <div class="editable" attr="desc">
                                                <div class="description-content js-desc-content">
                                                    <div class="current markeddown hide-on-edit js-desc js-show-with-desc hide" dir="auto"></div>
                                                    <p v-if="!editDescriptionModal && cardDetail.description==null" @click="openEditDescription" class="u-bottom js-hide-with-desc">
                                                        <a class="description-fake-text-area hide-on-edit js-edit-desc  js-hide-with-draft" href="#">Thêm
                                                            mô tả chi tiết hơn...</a></p>
                                                    <p v-if="!editDescriptionModal && cardDetail.description!=null" @click="openEditDescription" class="u-bottom js-hide-with-desc">
                                                        <a class="description-fake-text-area hide-on-edit js-edit-desc  js-hide-with-draft" href="#">{{
                                  cardDetail.description
                                }}</a>
                                                    </p>
                                                    <div class="description-edit edit" v-if="editDescriptionModal">
                                                        <textarea-autosize id="descriptionCard" v-model="description" class="description-draft" placeholder="Thêm mô tả chi tiết hơn..." ref="descriptionCard" :min-height="30" @keydown.enter="updateCardDescription" />
                                                        <div class="edit-controls u-clearfix"><input class="nch-button nch-button--primary confirm mod-submit-edit js-save-edit" type="submit" value="Lưu" @click="updateCardDescription">
                                                            <div class="btnCloseAddCard" @click="editDescriptionModal = false"><i class="el-icon-close"></i></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="cardDetail.files.length > 0" class="window-module attachments-section u-clearfix">
                                <div class="window-module-title window-module-title-no-divider">
                                    <span class="window-module-title-icon icon-lg icon-attachment"><i class="el-icon-paperclip"></i></span>
                                    <h3 class="u-inline-block">Các tập tin đính kèm</h3>
                                </div>
                                <div class="u-gutter">
                                    <div class="u-clearfix attachment-list ui-sortable">
                                        <File v-for="(item,index) in cardDetail.files" :file="item" @openDeleteFile="openDeleteFile" @showEditFile="openEditFile" :key="index" />
                                    </div>
                                </div>
                            </div>
                            <div v-if="cardDetail.check_lists.length > 0" class="checklist-list window-module js-checklist-list js-no-higher-edits ui-sortable">
                                <CheckList v-for="(item, index) in cardDetail.check_lists" @updateCheckList="reloadDetail" :checkList="item" @openDeleteCheckList="openDeleteCheckList" :key="index" :card="cardDetail" />
                            </div>
                        </div>
                        <DialogSibar @updateDetailCard="getDetailCard(cardDetail.id)" @showControl="handleShowControl" @deleteCard="deleteCard" @changeDeadline="changeDeadline" :card="cardDetail" />
                    </div>
                </div>
            </div>

        </el-dialog>
        <EditFile @closeFileEdit="closeFileEdit" @reload="reloadDetail" v-if="showEditFile" :offset="offsetEditFile" />

        <Action v-if="showActionList" @closeAction="closeActionList" @deleteList="deleteList" :offset="offset" v-click-outside="closeActionList" />
        <Delete v-if="showDelete" :offset="offsetDelete" @reloadList="reloadList" @closeDelete="closeDelete" @reloadCard="reloadDetail" />
        <Move v-if="showModalMove" :offset="offsetMove" @updateCardList="getDataList" @closeMove="closeMove" :list="list" />
    </template>
</AdminLayout>
</template>

<script>
import AdminLayout from "@/layouts/Admin";
import Directories from "@/components/admin/Directories";
import NewList from "@/components/include/NewDirectory";
import Action from "@/components/include/Action";
import File from "@/components/include/File";
import EditFile from "@/components/include/EditFile";
import Delete from "@/components/include/Delete";
import ModalSidebar from "@/components/include/ModalSidebar";
import EditCard from "@/components/include/EditCard";
import CheckList from "@/components/include/CheckList";
import DialogSibar from "@/components/include/DialogSibar";
import Move from "@/components/include/Move";
import ClickOutside from 'vue-click-outside'
import draggable from "vuedraggable";
import api from '../../api';
import _ from "lodash";
import moment from "moment";
import {
    mapMutations,
    mapState
} from 'vuex'

export default {
    name: "AdminVue",
    data() {
        return {
            addList: false,
            data: [],
            showControlModalSidebar: false,
            showCardEdit: false,
            showActionList: false,
            showActionFile: false,
            labels: [],
            card: [],
            dialogFormVisible: false,
            editDescriptionModal: false,
            offset: {},
            offsetEdit: {},
            offsetEditFile: {},
            offsetDelete: {},
            isComplete: false,
            isDeadline: 0,
            cardTitle: '',
            deadline: '',
            description: '',
            showEditFile: false,
            showDelete: false,
            offsetMove: {},
            showModalMove: false
        }
    },
    components: {
        Move,
        AdminLayout,
        Directories,
        draggable,
        NewList,
        ModalSidebar,
        EditCard,
        CheckList,
        DialogSibar,
        Action,
        File,
        EditFile,
        Delete
    },
    methods: {
        ...mapMutations('home', [
            'updateList', 'updateCardDetail'
        ]),
        moveList(e) {
            let id = e.draggedContext.element.id

            let payload = {
                index: e.draggedContext.futureIndex,
            }
            api.changeIndexList(payload, id).then(() => {
                this.getDataList()
            })

        },
        openEditFile(data) {
            this.offsetEditFile = data
            this.showEditFile = true;
        },
        openActionList(data) {
            this.offset = data
            this.showActionList = true
        },
        closeActionList() {
            this.showActionList = false
        },
        closeMove() {
            this.closeAll()
        },
        deleteList(id) {

            api.deleteList(id).then(() => {
                this.reload()
                this.closeActionList()
            })
        },
        newList() {
            this.addList = true
        },
        closeNewList() {
            this.addList = false
        },
        getDataList() {
            api.getList().then((response) => {
                this.updateList(response.data.data)
            })
        },
        loadData() {
            this.data = this.list
        },
        loadDescription() {
            this.description = this.cardDetail.description;
        },
        loadTitle() {
            this.cardTitle = this.cardDetail.title;
        },
        loadDeadline() {
            this.deadline = this.cardDetail.deadline
        },
        handleAddList(data) {
            api.addList(data).then(() => {
                this.getDataList();
            })
        },
        handleUpdateList(data) {
            api.updateTitleList(data.data, data.id).then(() => {
                this.getDataList();
            })
        },
        async handleShowControl(data) {
            if (data.type === 'label') {
                await this.getDatalabel()
            }
            if (_.isEmpty(this.offset)) {
                this.showControlModalSidebar = true;
            }
            if (!_.isEmpty(this.offset) && this.offset.type !== data.type) {
                this.showControlModalSidebar = true;
            } else if (!_.isEmpty(this.offset) && this.offset.type === data.type) {
                this.showControlModalSidebar = !this.showControlModalSidebar
            }
            this.offset = data
        },
        getDatalabel() {
            api.getLabels().then((response) => {
                this.labels = response.data.data;
            })
        },
        closeControlModal() {
            this.showControlModalSidebar = false
        },
        openQuickEdit(data) {
            this.closeAll()
            this.offsetEdit = data
            this.getDetailCard(data.id)
            this.showCardEdit = true;
        },
        closeCardEdit() {
            this.showCardEdit = false;
        },
        async openDetailCard(id) {
            this.closeAll()
            await api.getCard(id).then((response) => {
                this.card = response.data.data;
                this.updateCardDetail(this.card)
                this.reload()
                this.dialogFormVisible = true
            })

        },
        closeModal() {
            this.showControlModalSidebar = false
            this.dialogFormVisible = false
            this.closeAll()
        },
        deleteCard(data) {
            api.deleteCard(data).then(() => {
                this.closeModal()
                this.getDataList()
            })
        },
        reloadList() {
            this.closeModal()
            this.getDataList()
        },
        showMove(data) {
            this.offsetMove = data
            this.showModalMove = true
        },
        openControlLabel(e) {
            let rect = e.target.getBoundingClientRect();
            let data = {
                left: rect.left,
                top: rect.top,
                type: 'label'
            };
            this.handleShowControl(data)
        },
        openEditDescription() {
            this.editDescriptionModal = true;
        },
        async changeDeadline(data) {
            await api.changeStatusDeadline(data, this.card.id).then(() => {
                this.getDetailCard(this.card.id);
                this.loadDeadline();
            })
            this.resetTime()
        },
        changeDeadlineModal() {
            let data = {
                deadline: moment(this.deadline).format('YYYY-MM-DD HH:mm:ss'),
                directory_id: this.card.directory_id
            }

            this.changeDeadline(data)
        },
        updateCardTitle(e) {
            e.target.blur()
            let data = {
                title: e.target.value,
            }
            api.updateCard(data, this.card.id).then(() => {
                this.getDetailCard(this.card.id)
            })
        },

        editCardTitle(data) {
            api.updateCard(data, data.id).then(() => {
                this.getDetailCard(this.card.id)
            })
        },
        updateCardDescription() {
            let textarea = document.getElementById('descriptionCard')

            textarea.blur();

            let data = {
                title: this.cardDetail.title,
                description: this.description,
            }
            api.updateCard(data, this.card.id).then(() => {

                this.getDetailCard(this.card.id)
                this.editDescriptionModal = false
            })
        },
        changeStatusTodo() {
            let data = {};

            if (this.isComplete) {
                data.status = 1;
            } else {
                data.status = 0
            }

            data.directory_id = this.cardDetail.directory_id
            api.changeStatusTodo(data, this.cardDetail.id).then(() => {
                this.getDetailCard(this.cardDetail.id);
            })
        },
        formatDate(dateString) {
            return 'ngày ' + moment(dateString).format('DD-MM-yyyy  HH:mm:ss');
        },
        getDetailCard(id) {
            api.getCard(id).then((response) => {
                this.card = response.data.data;
                this.updateCardDetail(this.card)
                this.reload()
            })
        },
        resetTime() {
            this.isDeadline = 0;
            this.isComplete = false;
            this.deadline = ''
        },
        reloadLabel(data) {
            this.getDatalabel()
            this.getDataList()
            this.getDetailCard(data)
        },
        reloadDetail() {
            this.getDetailCard(this.cardDetail.id)
        },
        reload() {
            this.getDataList()
            this.loadTitle()
            this.loadDescription()
            this.loadDeadline()
            this.loadData()
            this.checkComplate()
            this.checkDeadline()
        },
        closeAll() {
            this.showActionList = false;
            this.showCardEdit = false;
            this.showEditFile = false;
            this.dialogFormVisible = false;
            this.showDelete = false
            this.showModalMove = false
        },
        checkComplate() {
            if (this.cardDetail.status == 0) {
                this.isComplete = false
            } else {
                this.isComplete = true
            }
        },
        checkDeadline() {
            let deadline = moment(this.cardDetail.deadline);
            let now = moment();
            if (deadline < now) {
                this.isDeadline = 2;
            } else if (deadline.format('YYYY-MM-dd') === now.format('YYYY-MM-dd')) {
                this.isDeadline = 1;
            } else {
                this.isDeadline = 0;
            }
        },
        searchDatalabel(data) {
            let payload = {
                q: data
            }
            api.getLabels(payload).then((response) => {
                console.log(response.data.data)
                this.labels = response.data.data
            })
        },
        closeFileEdit() {
            this.showEditFile = false
        },
        closeDelete() {
            this.showDelete = false
        },
        openDeleteFile(data) {
            data.type = "file"
            this.offsetDelete = data
            this.showDelete = true
        },
        openDeleteCheckList(data) {
            data.type = "check_list"
            this.offsetDelete = data
            this.showDelete = true
        }
    },
    computed: {
        ...mapState('home', [
            'list', 'cardDetail'
        ]),
        ...mapState('auth', [
            'authUser'
        ])
    },
    mounted() {
        this.popupItem = this.$el
        this.getDataList()
        this.loadData()
        this.getDatalabel()
        this.loadDeadline();
        this.loadDescription();
        this.loadTitle()
        this.checkComplate()
        this.checkDeadline()
    },
    updated() {
        this.getDatalabel()
        this.getDataList()
        this.loadData()
        this.loadDeadline();
        this.loadDescription();
        this.loadTitle()
        this.checkComplate()
        this.checkDeadline()
    },

    directives: {
        ClickOutside
    }
}
</script>

<style lang="scss" scoped>
@import "src/assets/scss/card_color";
@import "src/assets/scss/dialog_todo";

.adminMainContent {
    height: 100%;
    display: flex;
    padding-top: 30px;
    flex-direction: column;
    margin-right: 0;
    position: relative;
    transition: margin .1s ease-in;

    .main-content {
        position: relative;
        flex-grow: 1;

        .listTodo {
            display: flex;
            -webkit-user-select: none;
            user-select: none;
            white-space: nowrap;
            margin: 10px;
            margin-top: 0;
            margin-bottom: 8px;
            overflow-x: auto;
            overflow-y: hidden;
            padding-bottom: 8px;
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            top: 0;
            -webkit-overflow-scrolling: touch;
            height: 98%;

            .newList {
                text-align: left;
                width: 272px;
                margin: 0 4px;
                border-radius: 3px;
                color: #172b4d;
                transition: color 85ms ease-in;
                box-sizing: border-box;
                display: inline-block;
                vertical-align: top;
                white-space: nowrap;

                .title {
                    padding: 0 11px;

                    textarea {
                        background-color: #ebecf0;
                        border: none;
                        height: 28px;
                        width: 98%;
                        margin: 6px 0;
                        padding: 4px 0 4px 8px;
                        resize: none;
                    }

                    textarea[type="text"] {
                        font-size: 20px;
                        line-height: 24px;
                        font-weight: 600;
                    }

                    textarea:focus {
                        outline: none;
                        background-color: white;
                        box-shadow: inset 0 0 0 2px #0079bf;
                        border-color: #0079bf;
                        overflow: hidden;
                        overflow-wrap: break-word;
                    }
                }

                .btn-add {
                    width: 100%;
                    height: 50px;
                    line-height: 40px;
                    background-color: hsla(0, 0%, 100%, .24);
                    cursor: pointer;
                    border-radius: 3px;
                    color: #172b4d;
                    padding: 6px 14px;
                    transition: color 85ms ease-in;
                    box-sizing: border-box;
                    white-space: nowrap;

                    .plus {
                        margin-right: 10px;
                    }
                }

                .btn-add:hover {
                    background-color: hsla(0, 0%, 100%, .5);
                }
            }
        }

        .listTodo::-webkit-scrollbar {
            height: 8px;
        }

        .listTodo::-webkit-scrollbar-track {
            border-radius: 7px;
            background-color: #4f4f5073;
        }

        .listTodo::-webkit-scrollbar-thumb {
            background: #bcbcbe63;
            border-radius: 7px;
        }

        .listTodo::-webkit-scrollbar-thumb:hover {
            background: #d3d3d87d;
        }
    }
}
</style>