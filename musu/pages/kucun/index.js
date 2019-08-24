var is_no_more = false; 
var is_loading_more = false;
var WxParse = require('../../wxParse/wxParse.js');
Page({

    /**
     * 页面的初始数据d
     */
    data: {
        cat_list: [],
        sub_cat_list_scroll_top: 0,
        scrollLeft: 0,
        page: 1,
        typeIndex:0,
        cat_id:0,
        cat_style:0,
        active_index:0,
        height:0,
        catheight:120,
    }, 

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var self = this;
        getApp().page.onLoad(self, options);
        var store = getApp().core.getStorageSync(getApp().const.STORE);

		var user_info = getApp().getUser();
		this.data.level=user_info.level;
		this.setData({
                level: this.data.level
		});
		

    },

    onShow: function () {
        getApp().page.onShow(this);

        getApp().core.hideLoading();

        this.loadData();

    },

    loadData: function (options) {
        // 返回上一步  5 4
        var self = this;
        var store = getApp().core.getStorageSync(getApp().const.STORE);
        if(self.data.cat_list !='' && (store.cat_style==5 || store.cat_style==4 || store.cat_style==2) ){
            self.setData({
                cat_list: self.data.cat_list,
                current_cat: self.data.current_cat,
            });
            return;
        }

        getApp().request({
            url: getApp().api.default.kucunxilie,
            success: function (res) {

                console.log("分类");
                console.log(res);

                if(res.code == 1000){

                    console.log(res);
                    if (res.code == 1000) {
                        getApp().core.hideLoading();
                        self.setData({goods_list: res.data});
                    }
                    self.setData({
                        show_no_data_tip: (self.data.length == 0),
                    });

                };
            },
            complete: function () {
                getApp().core.stopPullDownRefresh();
            }
        });

        getApp().request({
            url: getApp().api.default.fahuo,
            success: function (res) {

                console.log("分类");
                console.log(res);

                if(res.code == 1000){

                    console.log(res);
                    if (res.code == 1000) {
                        var detail = res.data.ct_detail;
                        WxParse.wxParse("detail", "html", detail, self);
                    }


                };
            },
            complete: function () {
                getApp().core.stopPullDownRefresh();
            }
        });

    },


    catItemClick:function(e)
    {
        var index = e.currentTarget.dataset.index;

        this.setData({
            typeIndex:index
        });


        this.catClick(index);
    },


    onReachBottom: function () {
        getApp().page.onReachBottom(this);

        var self = this;
        if (is_no_more)
            return;
        if(getApp().core.getStorageSync(getApp().const.STORE).cat_style==5 || self.data.cat_style==-1){
            self.loadMoreGoodsList();
        }
    },

    loadMoreGoodsList: function () {
        var self = this;
        if (is_loading_more)
            return;
        self.setData({
            show_loading_bar: true,
        });
        is_loading_more = true;
        var cat_id = self.data.cat_id || "";
        var p = self.data.page || 2;

        getApp().request({
            url: getApp().api.default.goods_list,
            data: {
                page: p,
                cat_id: cat_id,
            },
            success: function (res) {
                if (res.data.list.length == 0)
                    is_no_more = true;
                var goods_list = self.data.goods_list.concat(res.data.list);
                self.setData({
                    goods_list: goods_list,
                    page: (p + 1),
                });
            },
            complete: function () {
                is_loading_more = false;
                self.setData({
                    show_loading_bar: false,
                });
            }
        });
    },
});