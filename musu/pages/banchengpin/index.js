var is_no_more = false; 
var is_loading_more = false;
var WxParse = require('../../wxParse/wxParse.js');
Page({

    /**
     * 页面的初始数据d
     */
    data: {
        cat_list: [],
        name_list:[{
            name:'葡萄架类',
            class:"active"
        },
            {
                name:'护栏类',
                class:""
            }, {
                name: '花箱类',
                class: ""
            }],
        sub_cat_list_scroll_top: 0,
        scrollLeft: 0,
        page: 1,
        activeIndex:0,
        guigeIndex:'',
        guigeIndex1:'',
        guigeIndex2:'',
        lizhuList:[],
        lizhuList1:[],
        lizhuList2:[],
		lizhuList3:[],
		lizhuList4:[],
		lizhuList5:[],
		changdu:'',
		count11:0,
		count12:0,
		count13:0,
		count14:0,
		lizhuListPrev:[],
		allMoney:0,
        cat_id:0,
        cat_style:0,
        active_index:0,
        height:0,
		putaojiaId:0,
		hlId:0,
        catheight:120,
		daoliangMoney:0,
		checkboxMoney:0,
		checkboxMoney1:0,
		lizhupejian1:'',
		lizhupejian:'',
		chengtao:'',
		kuanshi:'',
		level:-1,
    },
	xuanze:function()
	{
		console.log("xuanze");
		wx.navigateTo({
		  url: '/pages/xuanze/index'
		})
	},
	
	cdChange1:function(e)
	{
		this.setData({
            changdu:e.detail.value
        })
	},
	
	cdChange3:function(e)
	{
		this.setData({
            changdu1:e.detail.value
        })
	},
	
	putaojiaTap:function(e)
	{
		
		var daoliang="";
		if(this.data.level==-1)
		{
			
			daoliang=this.data.lizhuList4[this.data.guigeIndex4].include2;
		}
		else if(this.data.level==1)
		{
			
			daoliang=this.data.lizhuList4[this.data.guigeIndex4].include21;
		}
		else
		{
			
			daoliang=this.data.lizhuList4[this.data.guigeIndex4].include22;
		}
		
		var lizhupejian1Str="";
		
		if(this.data.level==-1)
		{
			lizhupejian1Str=this.data.lizhuList3[this.data.guigeIndex3].lizhu;
		}
		else if(this.data.level==1)
		{
			lizhupejian1Str=this.data.lizhuList3[this.data.guigeIndex3].lizhu1;
		}
		else
		{
			lizhupejian1Str=this.data.lizhuList3[this.data.guigeIndex3].lizhu2;
		}
		
		lizhupejian1Str=lizhupejian1Str+this.data.lizhupejian1;
		
		wx.navigateTo({
		  url:'/pages/new-order-submit/new-order-submit?mch_list=[{"mch_id":0,"goods_list":[{"goods_id":'+this.data.putaojiaId+',"num":1,"attr":[{"attr_group_id":1,"attr_group_name":"规格","attr_id":1,"attr_name":"默认"}]}]}]&price='+this.data.allMoney1+'&info=立柱个数-'+this.data.count13+'|刀片片数-'+this.data.count14+'|刀梁价格-'+this.data.daoliangMoney+'元&info1=葡萄架长度-'+this.data.changdu1+'|立柱规格-'+this.data.lizhuList3[this.data.guigeIndex3].name+'|立柱尺寸-'+this.data.lizhuList3[this.data.guigeIndex3].chicun+'|立柱配件-'+lizhupejian1Str+'|刀片名称-'+this.data.lizhuList4[this.data.guigeIndex4].name+'|刀梁-'+daoliang+'|刀片长度-'+this.data.lizhuList5[this.data.guigeIndex5].chicun
		})

		
	},
	
	//护栏下单
	putaojiaTap1:function(e)
	{
			
		var lizhupejianStr="";
		if(this.data.level==-1)
		{
			lizhupejianStr=this.data.lizhuList[this.data.guigeIndex].lizhu;
		}
		else if(this.data.level==1)
		{
			lizhupejianStr=this.data.lizhuList[this.data.guigeIndex].lizhu1;
		}
		else
		{
			lizhupejianStr=this.data.lizhuList[this.data.guigeIndex].lizhu2;
		}
		
		lizhupejianStr=lizhupejianStr+this.data.lizhupejian;
			
		var chengtaoStr=this.data.lizhuList2[this.data.guigeIndex2].price1+"元,"+this.data.chengtao;
			
		wx.navigateTo({
		  url:'/pages/new-order-submit/new-order-submit?mch_list=[{"mch_id":0,"goods_list":[{"goods_id":'+this.data.hlId+',"num":1,"attr":[{"attr_group_id":1,"attr_group_name":"规格","attr_id":1,"attr_name":"默认"}]}]}]&price='+this.data.allMoney+'&info=立柱个数-'+this.data.count11+'|护栏片数-'+this.data.count12+'&info1=护栏款式-'+this.data.kuanshi+'|立柱规格-'+this.data.lizhuList[this.data.guigeIndex].name+'|立柱尺寸-'+this.data.lizhuList[this.data.guigeIndex].chicun+'|立柱配件-'+lizhupejianStr+'|扶手/方管-'+this.data.lizhuList1[this.data.guigeIndex1].name+'护栏片柱中距-'+this.data.lizhuList2[this.data.guigeIndex2].chicun+'|是否成套组合-'+chengtaoStr
		})
						
		
	},

    count1:function()
    {
		
		if(!this.data.changdu)
		{
			return;
		}
		
		var chicunStr=this.data.lizhuList[this.data.guigeIndex].chicun
		var chicun=chicunStr.substr(chicunStr.length-4,3);
		console.log("chicun:"+chicun);
		
		var chicun1Str=this.data.lizhuList2[this.data.guigeIndex2].chicun;
		var chicun1=chicun1Str.substr(0,chicun1Str.length-1);
		
		console.log("chicun1:"+chicun1);
		
		console.log("changdu:"+this.data.changdu);
		
		chicun1=Math.floor((this.data.changdu/chicun1) * 10) / 10;
		
		var count11=Math.ceil(chicun1)+1;
		var count12=Math.ceil(chicun1);
		
		if(this.data.level==1)
		{
			var lizhuJibenMoney=this.data.lizhuList[this.data.guigeIndex].lizhu1;
		}
		else if(this.data.level==2)
		{
			var lizhuJibenMoney=this.data.lizhuList[this.data.guigeIndex].lizhu2;
		}
		else{
			var lizhuJibenMoney=this.data.lizhuList[this.data.guigeIndex].lizhu;
		}
		
		
		lizhuJibenMoney=lizhuJibenMoney.split("-")[1];
		lizhuJibenMoney=lizhuJibenMoney.substr(0, lizhuJibenMoney.length - 1);
		
		console.log("chicun1:"+chicun1);
		
		
		var money1=(this.data.checkboxMoney+parseFloat(lizhuJibenMoney))*count11;
		var money2=this.data.lizhuList2[this.data.guigeIndex2].priceAll*count12;
		
		console.log("checkboxMoney:"+this.data.checkboxMoney);
		console.log("money1"+money1);
		
		this.data.allMoney=money1+money2;
		
		 this.setData({
            allMoney:this.data.allMoney,
			count11:count11,
			count12:count12
        })
    },
	
	count2:function()
    {
		
		if(!this.data.changdu1)
		{
			return;
		}
		console.log("count2");
		
		var chicunStr=this.data.lizhuList3[this.data.guigeIndex3].chicun
		var chicun=chicunStr.substr(chicunStr.length-4,3);
		console.log("chicun:"+chicun);
		
		var chicun1Str=this.data.lizhuList5[this.data.guigeIndex5].chicun;
		var chicun1=chicun1Str.substr(0,1);
		
		console.log("chicun1:"+chicun1);

		console.log("changdu1:"+this.data.changdu1);
		
		console.log(this.data.lizhuList3);
		
		var count13=Math.floor((this.data.changdu1/3.5) * 10) / 10;
		
		
		//立柱个数
		count13=(Math.ceil(count13)+1)*2;
		
		var count14=Math.floor((this.data.changdu1/0.42) * 10) / 10;
		
		//根刀片
		count14=Math.ceil(count14)-1;
		
		
		
		
		//立柱价格
		
		
		
		
		if(this.data.level==1)
		{
			var lizhuJibenMoney=this.data.lizhuList3[this.data.guigeIndex3].lizhu1;
		}
		else if(this.data.level==2)
		{
			var lizhuJibenMoney=this.data.lizhuList3[this.data.guigeIndex3].lizhu2;
		}
		else{
			var lizhuJibenMoney=this.data.lizhuList3[this.data.guigeIndex3].lizhu;
		}
		
		lizhuJibenMoney=lizhuJibenMoney.split("-")[1];
		lizhuJibenMoney=lizhuJibenMoney.substr(0, lizhuJibenMoney.length - 1);
		
		var money1=(this.data.checkboxMoney1+parseFloat(lizhuJibenMoney))*count13;
		console.log("money1:"+money1);
		
		console.log(this.data.lizhuList5[this.data.guigeIndex5]);
		
		
		if(this.data.level==1)
		{
			var money2=this.data.lizhuList5[this.data.guigeIndex5].price_info1*count14;
		}
		else if(this.data.level==2)
		{
			var money2=this.data.lizhuList5[this.data.guigeIndex5].price_info2*count14;
		}
		else{
			var money2=this.data.lizhuList5[this.data.guigeIndex5].price_info*count14;
		}
		
		console.log("money2:"+money2);
		
		console.log(this.data.lizhuList4);
		
		//刀梁价格
		
		var money3=2*this.data.changdu1*this.data.lizhuList4[this.data.guigeIndex4].price1;
		console.log("money3:"+money3);
		
		var money4=this.data.lizhuList4[this.data.guigeIndex4].price2;
		console.log("money4:"+money4);
		
		this.data.daoliangMoney=parseFloat(money3)+parseFloat(money4);
		
		this.data.allMoney1=parseFloat(money1)+parseFloat(money2)+parseFloat(money3)+parseFloat(money4);
		
		this.setData({
			count14:count14,
			count13:count13,
			daoliangMoney:this.data.daoliangMoney,
            allMoney1:this.data.allMoney1
        })
		
    },

    changeValue:function(e)
    {
        console.log(e);
        this.data.guigeIndex=e.detail.value;

        this.setData({
            guigeIndex:this.data.guigeIndex
        })

    },
	
	changeValue2:function(e)
    {
		console.log("changeValue2");
        console.log(e);
        this.data.guigeIndex2=e.detail.value;

        this.setData({
            guigeIndex2:this.data.guigeIndex2
        })

    },
	
    changeValue1:function(e)
    {
        //console.log(this.data.lizhuList1);
        this.data.guigeIndex1=e.detail.value;

        this.setData({
            guigeIndex1:this.data.guigeIndex1
        })
		console.log("说明");
		console.log(this.data.lizhuList1[this.data.guigeIndex1]);

        var xzName=this.data.lizhuList1[this.data.guigeIndex1].name;
		console.log(xzName);
		
		this.data.lizhuList2=[];
		
		for(var i=0;i<this.data.lizhuListPrev.length;i++)
		{
			if(xzName.trim()==this.data.lizhuListPrev[i].name.trim())
			{
				this.data.lizhuList2.push(this.data.lizhuListPrev[i]);
			}
		}

		console.log(this.data.lizhuList2);
		this.data.guigeIndex2="";

		this.setData({lizhuList2: this.data.lizhuList2,
		guigeIndex2:this.data.lizhuList2
		});


    },
	
	
	 changeValue3:function(e)
    {
        console.log(e);
        this.data.guigeIndex3=e.detail.value;

        this.setData({
            guigeIndex3:this.data.guigeIndex3
        })

    },
	
	changeValue5:function(e)
    {
		console.log("changeValue2");
        console.log(e);
        this.data.guigeIndex5=e.detail.value;

        this.setData({
            guigeIndex5:this.data.guigeIndex5
        })

    },
	
    changeValue4:function(e)
    {
        //console.log(this.data.lizhuList1);
        this.data.guigeIndex4=e.detail.value;

        this.setData({
            guigeIndex4:this.data.guigeIndex4
        })

        var xzName=this.data.lizhuList4[this.data.guigeIndex4].name;
		console.log(xzName);
		console.log(this.data.lizhuListPrev1);
		this.data.lizhuList5=[];
		for(var i=0;i<this.data.lizhuListPrev1.length;i++)
		{
			if(xzName.trim()==this.data.lizhuListPrev1[i].name.trim())
			{
				console.log(this.data.lizhuListPrev1[i]);
				this.data.lizhuList5.push(this.data.lizhuListPrev1[i]);
			}
		}

		console.log(this.data.lizhuList5);

		this.setData({lizhuList5: this.data.lizhuList5});


    },

	

    changeTab:function(e)
    {
        console.log(e);
        console.log(e.currentTarget.id);
        for(var i=0;i<this.data.name_list.length;i++)
        {
            this.data.name_list[i].class="";
        }
        this.data.name_list[e.currentTarget.id].class="active";
        this.data.activeIndex=e.currentTarget.id;

        this.setData({name_list: this.data.name_list});
        this.setData({activeIndex: this.data.activeIndex});


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
		

        this.loadData();
		
		

    },
	
	checkboxChange:function(e)
	{
		console.log(e);
		this.data.checkboxMoney=0;
		
		
		
		this.data.lizhupejian="";
		
		for(var i=0;i<e.detail.value.length;i++)
		{
			this.data.checkboxMoney=parseFloat(this.data.checkboxMoney)+parseFloat(this.data.lizhuList[this.data.guigeIndex].list[e.detail.value[i]].value);
			
			this.data.lizhupejian=this.data.lizhupejian+","+this.data.lizhuList[this.data.guigeIndex].list[e.detail.value[i]].name;
		}
		this.setData({
                checkboxMoney: this.data.checkboxMoney
		});
		
		
		console.log(this.data.lizhupejian);
		console.log(this.data.checkboxMoney);
		
		
	},
	checkboxChange3:function(e)
	{
		console.log(e);
		
		
		this.data.lizhupejian1="";
		
		this.data.checkboxMoney1=0;
		for(var i=0;i<e.detail.value.length;i++)
		{
			this.data.checkboxMoney1=parseFloat(this.data.checkboxMoney1)+parseFloat(e.detail.value[i]);
			this.data.lizhupejian1=this.data.lizhupejian1+this.data.lizhuList3[this.data.guigeIndex3].list[e.detail.value[i]].name+",";
			
		}
		this.setData({
                checkboxMoney1: this.data.checkboxMoney1
		});
		
		console.log(this.data.lizhupejian1);
		console.log(this.data.checkboxMoney1);
		
		
	},
	
	checkboxChange1:function(e)
	{
		console.log(this.data.guigeIndex2);
		console.log(this.data.lizhuList2);
		this.data.chengtao="";
		
		if(e.detail.value.length>0)
		{
			this.data.lizhuList2[this.data.guigeIndex2].priceAll=parseFloat(this.data.lizhuList2[this.data.guigeIndex2].price1)+parseFloat(this.data.lizhuList2[this.data.guigeIndex2].price2);
			this.data.chengtao=this.data.lizhuList2[this.data.guigeIndex2].price1+"元+"+this.data.lizhuList2[this.data.guigeIndex2].price2+"元/套";
		}
		else{
			this.data.lizhuList2[this.data.guigeIndex2].priceAll=this.data.lizhuList2[this.data.guigeIndex2].price1;
			
		}
		
		console.log(this.data.chengtao);
		console.log(this.data.lizhuList2[this.data.guigeIndex2]);
		this.setData({
                lizhuList2: this.data.lizhuList2,
				guigeIndex2: this.data.guigeIndex2
            });
		
	},

    onShow: function () {
        getApp().page.onShow(this);

        getApp().core.hideLoading();
		
		var self = this;
        self.loadData1();
		
		var kuanshiData=getApp().globalData.kuanshiData;
		console.log(kuanshiData);
		if(kuanshiData.name)
		{
			this.data.kuanshi=kuanshiData.name;
			this.setData({
                kuanshi: this.data.kuanshi
            });

			getApp().request({
            url: getApp().api.default.hulanData,
            data:{c_name:"护栏类",c_g_id:kuanshiData.id},
            success: function (res) {

                console.log("分类");
                //console.log(res);

                if(res.code == 1000){

                    console.log(res);
                    if (res.code == 1000) {
                        getApp().core.hideLoading();
						
						
						if(!res.data.c_name1)
						{
							res.data.c_name1=[];
						}
						if(!res.data.c_name2)
						{
							res.data.c_name2=[];
						}
						if(!res.data.c_name3)
						{
							res.data.c_name3=[];
						}
						
                        for(var i=0;i<res.data.c_name1.length;i++)
                        {	
							
							var hulanList=[];
							
							if(self.data.level==1)
							{
								var arrayList=res.data.c_name1[i].include1.split("|");
							}
							else if(self.data.level==2)
							{
								var arrayList=res.data.c_name1[i].include2.split("|");
							}
							else{
								var arrayList=res.data.c_name1[i].include.split("|");
							}
							
							
							for(var j=0;j<arrayList.length;j++)
							{
								var obj={};
								obj.name=arrayList[j];
								var splitStr=arrayList[j].split('-')[1];
								obj.value=splitStr.substr(0, splitStr.length - 1);
								hulanList.push(obj);
							}
							
							
                            res.data.c_name1[i].list=hulanList;
                        }
						
						for(var i=0;i<res.data.c_name3.length;i++)
                        {	
							
							
							if(res.data.c_name3[i].price_info1.indexOf("+")>-1)
							{
								if(self.data.level==1)
								{
									var price_info=res.data.c_name3[i].price_info1.split("+");
								}
								else if(self.data.level==2)
								{
									var price_info=res.data.c_name3[i].price_info2.split("+");
								}
								else{
									var price_info=res.data.c_name3[i].price_info.split("+");
								}
								
								res.data.c_name3[i].priceAll=price_info[0];
								res.data.c_name3[i].price1=price_info[0];
								res.data.c_name3[i].value=1;
								res.data.c_name3[i].price2=price_info[1].substr(0,price_info[1].length-3);
							}
							else{
								
								if(self.data.level==1)
								{
									var price_info=res.data.c_name3[i].price_info1;
								}
								else if(self.data.level==2)
								{
									var price_info=res.data.c_name3[i].price_info2;
								}
								else{
									var price_info=res.data.c_name3[i].price_info;
								}
								
								res.data.c_name3[i].priceAll=price_info.substr(0,price_info.length-3);
								res.data.c_name3[i].price1=0;
								res.data.c_name3[i].price2=0;
								
							}
							
							
							
						}
						
						
						
						
						console.log(res.data.c_name1);
						
						
			
                        self.setData({
                            lizhuList: res.data.c_name1,
                            lizhuList1: res.data.c_name2,
							guigeIndex:'',
							guigeIndex1:'',
							guigeIndex2:'',
							count11:0,
							count12:0,
							allMoney:0,
							hlId:kuanshiData.id,
							lizhuListPrev: res.data.c_name3

                        });
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
			
			
		}
		


    },
	
	loadData1: function (options) {
        var self = this;
        self.setData({
            store: getApp().core.getStorageSync(getApp().const.STORE),
        });
        getApp().request({
            url: getApp().api.user.index,
            success: function (res) {
                if (res.code == 0) {
                    if(self.data.__platform=='my'){
                        var menus = res.data.menus;
                        menus.forEach(function(item,index,array){
                            if(item.id==='bangding'){
                                res.data.menus.splice(index,1,0);
                            }
                        });
                    }
                    self.setData(res.data);
                    getApp().core.setStorageSync(getApp().const.PAGES_USER_USER, res.data);
                    getApp().core.setStorageSync(getApp().const.SHARE_SETTING, res.data.share_setting);
                    getApp().core.setStorageSync(getApp().const.USER_INFO, res.data.user_info);
                }
            }
        });
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
            url: getApp().api.default.hulanData,
            data:{c_name:"葡萄架类"},
            success: function (res) {

                console.log("葡萄架类");
               

                if(res.code == 1000){

                    console.log(res);
                    if (res.code == 1000) {
                        getApp().core.hideLoading();
						
						if(!res.data.c_name1)
						{
							res.data.c_name1=[];
						}
						if(!res.data.c_name2)
						{
							res.data.c_name2=[];
						}
						if(!res.data.c_name3)
						{
							res.data.c_name3=[];
						}
						
						this.data.putaojiaId=res.data.c_g_id;
						
						
						
                        for(var i=0;i<res.data.c_name1.length;i++)
                        {	
							
							var hulanList=[];

							if(self.data.level==1)
							{
								var arrayList=res.data.c_name1[i].include1.split("|");
							}
							else if(self.data.level==2)
							{
								var arrayList=res.data.c_name1[i].include2.split("|");
							}
							else{
								var arrayList=res.data.c_name1[i].include.split("|");
							}
							
							for(var j=0;j<arrayList.length;j++)
							{
								var obj={};
								obj.name=arrayList[j];
								var splitStr=arrayList[j].split('-')[1];
								obj.value=splitStr.substr(0, splitStr.length - 1);
								hulanList.push(obj);
							}
							
							
                            res.data.c_name1[i].list=hulanList;
                        }
						
						for(var i=0;i<res.data.c_name2.length;i++)
                        {	
							
							
							
							if(self.data.level==1)
							{
								var splitStr=res.data.c_name2[i].include21.split("+");
							}
							else if(self.data.level==2)
							{
								var splitStr=res.data.c_name2[i].include22.split("+");
							}
							else{
								var splitStr=res.data.c_name2[i].include2.split("+");
							}
							
							
							var splitStr1=splitStr[1].split("元")[0];
							var splitStr0=splitStr[0].split("-")[1];
							res.data.c_name2[i].price1=splitStr0.substr(0,splitStr0.length-3);
							res.data.c_name2[i].price2=splitStr1.substr(0,splitStr0.length-1);
                        }
						
						
                        self.setData({
							lizhuList3: res.data.c_name1,
                            lizhuList4: res.data.c_name2,
							putaojiaId:this.data.putaojiaId,
							lizhuListPrev1: res.data.c_name3
							});
							
							console.log(self.data.lizhuList3);
							
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
            url: getApp().api.default.banchengpinfahuo,
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