const status_msgs = {
  URL_GEN_SUCCESS: {
    title: 'Shortened your link!',
    icon: 'check_circle',
    icon_color: 'green-text',
    collapsable: true
  },
  URL_GEN_FAILED: {
    title: 'Failed to shorten your link',
    icon: 'remove_circle',
    icon_color: 'red-text',
    collapsable: false
  },
  URL_DEL_SUCCESS: {
    title: 'Revoked your short link!',
    icon: 'check_circle',
    icon_color: 'green-text',
    body: 'We only remove the main url from our system. Short links are reserved permanently in our system.',
    collapsable: true
  },
  URL_DEL_FAILED: {
    title: 'Failed to delete your shortened link',
    icon: 'error',
    icon_color: 'red-text',
    collapsable: false
  },
  WRONG_SECRET_KEY: {
    title: 'Your secret key was wrong!',
    icon: 'no_encryption',
    icon_color: 'red-text',
    collapsable: false
  },

  URL_SUFFIX_EXISTS: {
    title: 'Someone already took that custom url before you!',
    icon: 'info',
    icon_color: 'orange-text',
    collapsable: false
  },

  UNKNOWN_ERROR: {
    title: 'Something went wrong.',
    icon: 'sentiment_very_dissatisfied',
    icon_color: 'orange-text',
    collapsable: false
  }
}
