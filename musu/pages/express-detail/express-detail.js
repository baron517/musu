// pages/express-detail/express-detail.js
var app = getApp();
var api = getApp().api;
Page({

    /**
     * 页面的初始数据
     */
    data: {
		wuliu:''
	},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        getApp().page.onLoad(this, options);
        if (options.inId){
            var data = {
                order_id:options.inId,
                type:'IN'
            }
        }else{
            var data = {
                order_id: options.id,
                type: 'mall'
            }
        }
		
		if(options.wuliu&&options.wuliu!="null")
		{
			this.data.wuliu=options.wuliu;
			
			this.setData({
                        wuliu:this.data.wuliu
                    })
			
		}

        this.loadData(data);
    },
    /**
     * 加载页面数据
     */
    loadData: function (data) {
		
		console.log(data);
		
        var self = this;
        getApp().core.showLoading({
            title: "正在加载",
        });
        getApp().request({
            url: getApp().api.order.express_detail,
            data: data,
            success: function (res) {
                getApp().core.hideLoading();
                if (res.code == 0) {
                    self.setData({
                        data: res.data,
                    })
                }
                if (res.code == 1) {
                    getApp().core.showModal({
                        title: "提示",
                        content: res.msg,
                        showCancel: false,
                        success: function (e) {
                            if (e.confirm) {
                                getApp().core.navigateBack();
                            }
                        }
                    });
                }
            }
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        getApp().page.onReady(this);
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        getApp().page.onShow(this);
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        getApp().page.onHide(this);
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        getApp().page.onUnload(this);
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    copyText: function (e) {
        var self = this;
        var text = e.currentTarget.dataset.text;
        getApp().core.setClipboardData({
            data: text,
            success: function () {
                getApp().core.showToast({
                    title: "已复制"
                });
            }
        });
    },
});