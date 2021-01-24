# 自製 Google map 附近商店搜尋系統

以 google map API 來當作練習使用 React 來去做前端介面。

功能介紹：

![圖片](https://ibb.co/mN0JLsk)


一、移動時會自動搜尋附近商店

二、可更改搜尋種類

三、可更改衛星與路面圖

四、搜尋欄有自動提示功能

五、點擊搜尋文字可以跳到該地點

六、點擊商店地標可看到商店詳細資訊


# 如何使用：

首先需要去 google 申請 google API key 來做往後 google API 的使用。

先去 [google 地圖網站](https://cloud.google.com/maps-platform/)

點選地圖介面集以及地點介面集並且按繼續。
觀看憑證有無 Maps API Key ，這組就是用來使用 google maps 相關功能的 API key 請保管好並且不要外洩。
[相關申請教學](https://www.coderbridge.com/series/a98833b7bf4d43d38c7d541cf4cbe1b1/posts/c323dab93cad46f8bb632792c056ca66)



## ㄧ、 git clone 把專案下載到你的資料夾

## 二、 npm install 安裝所需套件

## 三、在 src 底下新增檔案 key.js

## 四、在 key.js 裡面 
```js
export const Key = '你的 Maps API Key';
```
## 五、npm start 即可使用

相關設定說明：

一、起始地圖畫面設定，在 src/App.js 檔案裡面有以下這段
```js
SimpleMap.defaultProps = {
  center: {
    lat: 25.0441443, // 你要初始的經緯度
    lng: 121.5711905,// 你要初始的經緯度
  },
  zoom: 17, // 地圖的縮放比例
};
```
如何取得經緯度可以打開 google map 搜尋你要的地點，可以看到網址列上 @ 後面到 z 的就是經緯度。

二、商店種類設置：
請到 src/Component/SearchType/SearchTypeOptions.js 檔案裡面找到
```js
<SearchType
  value="麵包店" // 想設置的名字
  name="bakery" // 設置 google 提供的 place type
  isOption={searchType === "bakery"} // 請把 “”裡面的值改為跟 name 一樣
/>
```
請注意 **name的值只能填google提供的** 

[商店種類](https://developers.google.com/places/supported_types?hl=zh-TW)
請看 Table 1: Place types 底下的英文單字都是可以使用的。

例如我要更改成搜尋圖書館 
```js
<SearchType
  value="圖書館"
  name="library"
  isOption={searchType === "library"}
/>
```
要新增只要把以上程式碼複製到下方即可
```js
<SearchType
  value="麵包店" 
  name="bakery"
  isOption={searchType === "bakery"} 
/>

<SearchType
  value="圖書館"
  name="library"
  isOption={searchType === "library"}
/>
```

附註： 

此作品來源為 [七天打造自己的 Google Map 應用入門](https://www.coderbridge.com/series/a98833b7bf4d43d38c7d541cf4cbe1b1)
感謝如此詳細以及淺顯易懂的教學。

相關資源：
[google-map-react](https://github.com/google-map-react/google-map-react)
