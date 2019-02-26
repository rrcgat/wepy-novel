import wepy from 'wepy'
import hosts from '@/config'
import requests from '@/utils/requests'

export default class favoriteMixin extends wepy.mixin {
  methods = {
    async favorite(bid) {
      let res = await wepy.showActionSheet({
        itemList: ['💓', '💔']
      })

      if (!res.cancel) {
        console.log(res.tapIndex)
        requests
          .post({
            url: hosts.star,
            session: true,
            hideLoading: true,
            data: { book_id: bid, star: res.tapIndex ^ 1 }
          })
          .then(e => {
            let title = '💓'
            if (res.tapIndex) {
              title = '💔'
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
