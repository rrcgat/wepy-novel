import wepy from 'wepy'
import hosts from '@/config'
import requests from '@/utils/requests'

export default class favoriteMixin extends wepy.mixin {
  methods = {
    async favorite(bid) {
      let res = await wepy.showActionSheet({
        itemList: ['喜欢', '不喜欢']
      })

      if (!res.cancel) {
        requests
          .post({
            url: hosts.star,
            session: true,
            hideLoading: true,
            data: { book_id: bid, star: res.tapIndex ^ 1 }
          })
          .then(e => {
            let title = '喜欢'
            if (res.tapIndex) {
              title = '不喜欢'
            }
            wepy.showToast({
              title: title,
              icon: 'none',
              duration: 2000
            })
          })
      }
    }
  }
}
