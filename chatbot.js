/**
 * 順德龍山同鄉會 AI 智能客服
 * 策略：關鍵詞即時回覆 + NVIDIA API 智能回答
 */
(function () {
  'use strict';

  var API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
  var API_KEY = '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';
  var MODEL = 'qwen/qwen3-coder-480b-a35b-instruct';
  var SYS = '你是順德龍山同鄉會的AI客服。用繁體中文回答，語氣親切簡潔。只回答同鄉會相關問題（入會、福利、聯絡、活動、架構、文化等），無關問題禮貌拒答。不超過三句。';

  /* 關鍵詞知識庫 */
  var KB = [
    { k: ['入會','加入','會員','申請','報名'], a: '入會條件：年滿18歲、本人或直系親屬為龍山籍、認同章程。流程：填申請表 → 繳HK$100永久會費 → 理事會審核。官網可下載表格。' },
    { k: ['會費','費用','多少錢','收費'], a: '永久入會費HK$100，一次繳付。請到秘書處繳費激活會員資格。' },
    { k: ['福利','優惠','好處','權益'], a: '會員福利：①活動優先參與 ②會員企業折扣 ③免費法律諮詢 ④文化資源與出版物' },
    { k: ['活動','聯誼','聚會','座談'], a: '定期舉辦花炮會、新春座談會、觀音開庫旅行團、義工頒獎禮等，會員優先。詳見「本會動態」。' },
    { k: ['地址','在哪','位置','怎麼去','點去'], a: '香港九龍旺角彌敦道580號恆隆大廈12樓\n辦公時間：週一至週五 9:00-12:00' },
    { k: ['電話','聯繫','聯絡','熱線'], a: '電話/傳真：+852 2770 8156\n電郵：admin@longshan.xin\nWhatsApp：9557 0712（梁美玉秘書）' },
    { k: ['會長','胡國光'], a: '現任會長：胡國光\n副會長：左倩武、賴寶捷、左擴源、陳偉文、何志偉\n會務顧問：左匯雄' },
    { k: ['時間','辦公','上班','營業'], a: '辦公時間：週一至週五 9:00-12:00\n非辦公時間請電郵 admin@longshan.xin 或 WhatsApp 9557 0712' },
    { k: ['法律','諮詢','律師'], a: '會員可享免費基礎法律諮詢，請聯繫秘書處預約。' },
    { k: ['花炮','炮會','燒炮'], a: '花炮會是年度盛事，源自龍山「燒大炮」民俗。第三屆已於2026年3月14日舉行。' },
    { k: ['觀音開庫','開庫','祈福'], a: '「觀音開庫」是順德千年民俗，廣東省非遺。本會每年組織鄉親回鄉參與。' },
    { k: ['私隱','隱私','個人資料'], a: '本會遵守香港《私隱條例》，詳見 longshan.xin/pp/' },
    { k: ['介紹','關於','簡介','什麼'], a: '順德龍山同鄉會始創1985年，以「團結、服務、造福鄉親」為宗旨，聯繫全球龍山鄉親，傳承龍山文化。' },
    { k: ['你好','您好','hi','hello','嗨'], a: '您好！我是龍山同鄉會AI客服，可幫您了解入會、活動、聯絡方式等。請問需要什麼幫助？' }
  ];

  function kwMatch(msg) {
    var l = msg.toLowerCase();
    for (var i = 0; i < KB.length; i++) {
      for (var j = 0; j < KB[i].k.length; j++) {
        if (l.indexOf(KB[i].k[j]) !== -1) return KB[i].a;
      }
    }
    return null;
  }

  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  function addMsg(text, who) {
    var box = document.getElementById('chatbot-messages');
    var row = document.createElement('div');
    row.style.cssText = 'display:flex;' + (who === 'user' ? 'justify-content:flex-end;' : 'justify-content:flex-start;');
    var b = document.createElement('div');
    b.style.cssText = who === 'user'
      ? 'background:#C8102E;color:#fff;border-radius:16px 16px 4px 16px;padding:10px 14px;max-width:80%;font-size:14px;white-space:pre-wrap;word-break:break-word;line-height:1.6;'
      : 'background:#fff;color:#333;border:1px solid #e5e7eb;border-radius:16px 16px 16px 4px;padding:10px 14px;max-width:80%;font-size:14px;white-space:pre-wrap;word-break:break-word;line-height:1.6;';
    b.innerHTML = who === 'user' ? esc(text) : text;
    row.appendChild(b);
    box.appendChild(row);
    box.scrollTop = box.scrollHeight;
  }

  function typing(on) {
    var old = document.getElementById('cb-typing');
    if (old) old.remove();
    if (!on) return;
    var box = document.getElementById('chatbot-messages');
    var row = document.createElement('div');
    row.id = 'cb-typing';
    row.style.cssText = 'display:flex;justify-content:flex-start;';
    row.innerHTML = '<div style="background:#fff;color:#999;border:1px solid #e5e7eb;border-radius:16px 16px 16px 4px;padding:10px 14px;font-size:13px;">正在輸入...</div>';
    box.appendChild(row);
    box.scrollTop = box.scrollHeight;
  }

  async function askAI(msg) {
    var r = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: SYS },
          { role: 'user', content: msg }
        ],
        temperature: 0.5,
        max_tokens: 256,
        stream: false
      })
    });
    if (!r.ok) throw new Error(r.status);
    var d = await r.json();
    return (d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content || '').trim();
  }

  function fallback() {
    return '我可以幫您了解：入會方式、會員福利、活動資訊、聯絡方式、辦公時間等。請問您想了解什麼？';
  }

  window.toggleChat = function () {
    var p = document.getElementById('chatbot-panel');
    var ic = document.getElementById('chat-btn-icon');
    var isHidden = p.style.display === 'none';
    p.style.display = isHidden ? 'flex' : 'none';
    ic.className = isHidden ? 'fas fa-times text-lg' : 'fas fa-comments text-lg';
    if (isHidden) document.getElementById('chatbot-input').focus();
  };

  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('chatbot-form').addEventListener('submit', async function (e) {
      e.preventDefault();
      var inp = document.getElementById('chatbot-input');
      var msg = inp.value.trim();
      if (!msg) return;
      addMsg(msg, 'user');
      inp.value = '';

      /* 關鍵詞即時回覆 */
      var kw = kwMatch(msg);
      if (kw) { addMsg(kw, 'bot'); return; }

      /* AI 回覆 */
      try {
        typing(true);
        var reply = await askAI(msg);
        typing(false);
        addMsg(reply || fallback(), 'bot');
      } catch (err) {
        typing(false);
        console.error('Chatbot:', err);
        addMsg(fallback(), 'bot');
      }
    });
  });
})();
