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
        content: entry.querySelector('content').textContent.replace(/<[^>]+>/g, ""), // 清除 HTML 标签
        url: entry.querySelector('url').textContent
      }))
    })

  const $searchMask = document.getElementById('search-mask')
  const $searchInput = document.getElementById('search-input')
  const $searchResult = document.getElementById('search-result')
  const $searchBtn = document.getElementById('search-button')

  if ($searchBtn) {
    $searchBtn.addEventListener('click', () => {
      $searchMask.style.display = 'flex'
      $searchInput.focus()
    })
  }

  $searchMask.addEventListener('click', (e) => {
    if (e.target.id === 'search-mask') {
      $searchMask.style.display = 'none'
      $searchInput.value = ''
      $searchResult.innerHTML = ''
    }
  })

  // 关键词高亮函数
  function highlight(text, keywords) {
    keywords.forEach(kw => {
      const reg = new RegExp(`(${kw})`, 'gi')
      text = text.replace(reg, '<mark>$1</mark>')
    })
    return text
  }

  // 搜索输入事件
  $searchInput.addEventListener('input', () => {
    const rawInput = $searchInput.value.trim().toLowerCase()
    if (!rawInput) {
      $searchResult.innerHTML = ''
      return
    }

    const keywords = rawInput.split(/\s+/)

    const result = searchData.filter(item => {
      const title = item.title.toLowerCase()
      const content = item.content.toLowerCase()
      return keywords.some(kw => title.includes(kw) || content.includes(kw))
    })

    // 渲染搜索结果
    $searchResult.innerHTML = result.map(item => {
      // 提取匹配关键词附近的文本作为摘要
      let snippet = ''
      const lowerContent = item.content.toLowerCase()
      let pos = -1

      for (let kw of keywords) {
        pos = lowerContent.indexOf(kw)
        if (pos !== -1) break
      }

      if (pos !== -1) {
        const start = Math.max(0, pos - 30)
        const end = Math.min(item.content.length, pos + 70)
        snippet = item.content.substring(start, end)
      } else {
        snippet = item.content.substring(0, 100)
      }

      const highlightedTitle = highlight(item.title, keywords)
      const highlightedSnippet = highlight(snippet, keywords)

      return `
        <li>
          <a href="${item.url}">
            <div class="search-title">${highlightedTitle}</div>
            <div class="search-snippet">${highlightedSnippet}...</div>
          </a>
        </li>
      `
    }).join('')
  })
})
