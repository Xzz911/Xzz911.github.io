window.addEventListener('load', () => {
    let searchData = []
  
    // 加载 search.xml 数据
    fetch('/search.xml')
      .then(res => res.text())
      .then(xmlStr => {
        const parser = new DOMParser()
        const xml = parser.parseFromString(xmlStr, 'text/xml')
        const entries = xml.querySelectorAll('entry')
        searchData = Array.from(entries).map(entry => ({
          title: entry.querySelector('title').textContent,
          content: entry.querySelector('content').textContent,
          url: entry.querySelector('url').textContent
        }))
      })
  
    // 获取 DOM 元素
    const $searchMask = document.getElementById('search-mask')
    const $searchInput = document.getElementById('search-input')
    const $searchResult = document.getElementById('search-result')
  
    // 点击搜索按钮显示遮罩
    document.getElementById('search-button').addEventListener('click', () => {
      $searchMask.style.display = 'flex'
      $searchInput.focus()
    })
  
    // 点击遮罩关闭搜索框
    $searchMask.addEventListener('click', (e) => {
      if (e.target.id === 'search-mask') {
        $searchMask.style.display = 'none'
        $searchInput.value = ''
        $searchResult.innerHTML = ''
      }
    })
  
    // 高亮多个关键词
    function highlightKeywords(text, keywords) {
      keywords.forEach(kw => {
        const reg = new RegExp(`(${kw})`, 'gi')
        text = text.replace(reg, '<mark>$1</mark>')
      })
      return text
    }
  
    // 搜索逻辑（任意关键词命中标题或正文即可）
    $searchInput.addEventListener('input', () => {
      const rawInput = $searchInput.value.trim().toLowerCase()
      if (!rawInput) {
        $searchResult.innerHTML = ''
        return
      }
  
      const keywords = rawInput.split(/\s+/).filter(kw => kw.length > 0)
  
      const result = searchData.filter(item => {
        const title = item.title.toLowerCase()
        const content = item.content.toLowerCase()
        return keywords.some(kw => title.includes(kw) || content.includes(kw))
      })
  
      $searchResult.innerHTML = result.map(item => {
        const highlightedTitle = highlightKeywords(item.title, keywords)
        const snippet = highlightKeywords(item.content.substring(0, 100), keywords)
        return `
          <li>
            <a href="${item.url}">
              <strong>${highlightedTitle}</strong><br />
              <small>${snippet}...</small>
            </a>
          </li>
        `
      }).join('')
    })
  })
  