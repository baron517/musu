var area_picker = require('./../../components/area-picker/area-picker.js');
Page({
    data: {
        gcbb_name: "",
        gcbb_dizhi: "",
        gcbb_detail: "",
        gcbb_person: "",
        gcbb_dianhua: "",
        gcbb_jfdanwei: "",
        gcbb_jfdianhua: ""

    },
    onLoad: function (options) {

    },

    getDistrictData: function (cb) {
        var district = getApp().core.getStorageSync(getApp().const.DISTRICT);
        if (!district) {
            getApp().core.showLoading({
                title: "正在加载",
                mask: true,
            });
            getApp().request({
                url: getApp().api.default.district,
                success: function (res) {
                    getApp().core.hideLoading();
                    if (res.code == 0) {
                        district = res.data;
                        getApp().core.setStorageSync(getApp().const.DISTRICT,district);
                        cb(district);
                    }
                }
            });
            return;
        }
        cb(district);
    },

    onAreaPickerConfirm: function (e) {
        var self = this;
        self.setData({
            district: {
                province: {
                    id: e[0].id,
                    name: e[0].name,
                },
                city: {
                    id: e[1].id,
                    name: e[1].name,
                },
                district: {
                    id: e[2].id,
                    name: e[2].name,
                },
            }
        });
    },

    saveAddress: function () {
        var self = this;

        getApp().core.showLoading({
            title: "正在保存",
            mask: true,
        });

        var param= {
                gcbb_name: self.data.gcbb_name || "",
                gcbb_dizhi: self.data.gcbb_dizhi,
                gcbb_detail: self.data.gcbb_detail,
                gcbb_person: self.data.gcbb_person,
                gcbb_dianhua: self.data.gcbb_dianhua,
                gcbb_jfdanwei: self.data.gcbb_jfdanwei,
                gcbb_jfdianhua: self.data.gcbb_jfdianhua
            };

        for(var key  in param)
        {
            if(!param[key])
            {
                wx.showToast({
                    title: '不能为空',
                    icon: 'none',
                    duration: 2000
                })
                return;
            }
        }



        getApp().request({
            url: getApp().api.default.gongchengBaobei,
            method: "post",
            data:param,
            success: function (res) {
                getApp().core.hideLoading();
                if (res.code == 1000) {
                    getApp().core.showModal({
                        title: "提示",
                        content: res.msg,
                        showCancel: false,
                        success: function (res) {
                            if (res.confirm) {
                                getApp().core.navigateBack();
                            }
                        }
                    });
                }
                else{
                    self.showToast({
                        title: res.msg,
                    });
                }
            }
        });
    },

    inputBlur: function (e) {
        var name = e.currentTarget.dataset.name;
        var value = e.detail.value;
        var data = '{"' + name + '":"' + value + '"}';
        this.setData(JSON.parse(data));
    },

    getWechatAddress: function (e) {
        var self = this;
        getApp().core.chooseAddress({
            success: function (e) {
                if (e.errMsg != 'chooseAddress:ok')
                    return;
                getApp().core.showLoading();
                getApp().request({
                    url: getApp().api.user.wechat_district,
                    data: {
                        national_code: e.nationalCode,
                        province_name: e.provinceName,
                        city_name: e.cityName,
                        county_name: e.countyName,
                    },
                    success: function (res) {
                        if (res.code == 1) {
                            getApp().core.showModal({
                                title: '提示',
                                content: res.msg,
                                showCancel: false,
                            });
                        }
                        self.setData({
                            name: e.userName || "",
                            mobile: e.telNumber || "",
                            detail: e.detailInfo || "",
                            district: res.data.district,
                        });
                    },
                    complete: function () {
                        getApp().core.hideLoading();
                    }
                });
            }
        });
    },

    onShow: function () {
        getApp().page.onShow(this);
    },
});