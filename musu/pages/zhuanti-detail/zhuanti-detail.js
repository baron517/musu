var WxParse = require('../../wxParse/wxParse.js');
var shoppingCart = require('../../components/shopping_cart/shopping_cart.js');
var specificationsModel = require('../../components/specifications_model/specifications_model.js'); //快速购买多规格
var gSpecificationsModel = require('../../components/goods/specifications_model.js'); //商城多规格选择
var goodsBanner = require('../../components/goods/goods_banner.js');
var goodsInfo = require('../../components/goods/goods_info.js');
var goodsBuy = require('../../components/goods/goods_buy.js');
var goodsRecommend = require('../../components/goods/goods_recommend.js');
var p = 1;
var is_loading_comment = false;
var is_more_comment = true;
var share_count = 0;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageType: 'STORE', //模块页面标识
        sj_id: null,
        cat_id:0,
        sj_dianhua:0,
        goods: {},
        show_attr_picker: false,
        form: {
            number: 1,
        },
        tab_detail: "active",
        tab_comment: "",
        autoplay: false,
        hide: "hide",
        show: false,
        x: getApp().core.getSystemInfoSync().windowWidth,
        y: getApp().core.getSystemInfoSync().windowHeight - 20,
        page: 1,
        drop: false,
        goodsModel: false,
        goods_num: 0,
        temporaryGood: {
            price: 0.00, // 对应规格的价格
            num: 0,
            use_attr: 1
        },
        goodNumCount: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        getApp().page.onLoad(this, options);

        var self = this;

        self.setData({
            sj_id: options.sj_id,
            cat_id:options.cat_id
        });
        self.getGoods();

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        getApp().page.onReady(this);
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        getApp().page.onHide(this);
        shoppingCart.saveItemData(this);
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        getApp().page.onUnload(this);
        shoppingCart.saveItemData(this);
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        getApp().page.onPullDownRefresh(this);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        getApp().page.onReachBottom(this);
        var self = this;
        if (self.data.tab_detail == 'active' && self.data.drop) {
            self.data.drop = false;
            self.goods_recommend({
                'goods_id': self.data.goods.id,
                'loadmore': true
            });

        } else if (self.data.tab_comment == 'active') {
            self.getCommentList(true);
        }

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        getApp().page.onShareAppMessage(this);
        var self = this;
        var user_info = getApp().getUser();
        var res = {
            path: "/pages/goods/goods?id=" + this.data.id + "&user_id=" + user_info.id,
            success: function(e) {
                share_count++;
                if (share_count == 1)
                    self.shareSendCoupon(self);
            },
            title: self.data.goods.name,
            imageUrl: self.data.goods.pic_list[0],
        };
        return res;
    },

    closeCouponBox: function(e) {
        this.setData({
            get_coupon_list: ""
        });
    },

    to_dial: function(e) {
        var contact_tel = this.data.store.contact_tel;
        getApp().core.makePhoneCall({
            phoneNumber: contact_tel
        })
    },

    yuyue:function()
    {

      console.log(this.data.sj_dianhua);

        wx.makePhoneCall({
            phoneNumber: this.data.sj_dianhua,
            success: function () {
                console.log("拨打电话成功！")
            },
            fail: function () {
                console.log("拨打电话失败！")
            }
        })


    },

    getGoods: function() {
        var self = this;


        getApp().request({
            url: getApp().api.default.catDetail,
            data: {
                sj_id: self.data.sj_id,
                cat_id: self.data.cat_id
            },
            success: function(res) {
                if (res.code == 0) {
                    var detail = res.data.sj_detail;
                    console.log(detail);
                    WxParse.wxParse("detail", "html", detail, self);


                    self.setData({
                        sj_dianhua:  res.data.sj_dianhua
                    });


                }

            }
        });
    },

    getCommentList: function(more) {
        var self = this;
        if (more && self.data.tab_comment != "active")
            return;
        if (is_loading_comment)
            return;
        if (!is_more_comment)
            return;
        is_loading_comment = true;
        getApp().request({
            url: getApp().api.default.comment_list,
            data: {
                goods_id: self.data.id,
                page: p,
            },
            success: function(res) {
                if (res.code != 0)
                    return;
                is_loading_comment = false;
                p++;
                self.setData({
                    comment_count: res.data.comment_count,
                    comment_list: more ? self.data.comment_list.concat(res.data.list) : res.data.list,
                });
                if (res.data.list.length == 0)
                    is_more_comment = false;
            }
        });
    },

    tabSwitch: function(e) {
        var self = this;
        var tab = e.currentTarget.dataset.tab;
        if (tab == "detail") {
            self.setData({
                tab_detail: "active",
                tab_comment: "",
            });
        } else {
            self.setData({
                tab_detail: "",
                tab_comment: "active",
            });
        }
    },
    commentPicView: function(e) {
        var self = this;
        var index = e.currentTarget.dataset.index;
        var pic_index = e.currentTarget.dataset.picIndex;
        getApp().core.previewImage({
            current: self.data.comment_list[index].pic_list[pic_index],
            urls: self.data.comment_list[index].pic_list,
        });
    },

});