import React, { useEffect } from 'react'
import history from '@project/history'; // 使用跟项目的组件

history(1)

function Blog() {
  useEffect(() => {
    console.log('2222')
  }, []);

  return (
    <div>
      <div>Blog</div>
    </div>
  )
}

export default Blog;
