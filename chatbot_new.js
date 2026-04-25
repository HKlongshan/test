/**
 * 順德龍山同鄉會 AI 智能客服 v2
 * 更人性化的回覆 + 更美的UI
 */
(function () {
  'use strict';

  var API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
  var API_KEY = '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';
  var MODEL = 'qwen/qwen3-coder-480b-a35b-instruct';
  var SYS = '你是順德龍山同鄉會的AI客服小助手「龍仔」。用繁體中文回答，親切友善如朋友。用「～」「啦」「呢」等口語。不超過3句話。，無聊問題婉拒。';

  /* 更人性化的知識庫 */
  var KB = [
    /* 入會 */
    { k: ['入會','加入','會員','申請','報名','點樣入','點樣join','想入會','我想入','點先'], a: '歡迎入會！只需填寫申請表，連同 HK$100 永久會費畀秘書處就得啦～如有親戚朋友想加入都歡迎介紹埋佢！' },
    { k: ['會費','多少錢','收費','要幾多','要幾錢','費用','年費','月費'], a: '會費係一次過 HK$100咋，永久會員添！唔使年年交咁麻煩～繳費後就會有會員證，享有所有會員福利架啦！' },
    { k: ['会员证','會員證','會員卡','member card'], a: '繳完會費 HK$100 後就會收到會員證終身使用啦～幾靚架！' },
    
    /* 福利 */
    { k: ['福利','優惠','好處','有咩著數','有咩著数','有咩益處','優惠','著数','著數'], a: '會員優惠幾多架：活動優先報名、會員商戶折扣、免費法律諮詢、龍山文化書籍等～記得帶會員證享有優惠啊！' },
    { k: ['優惠券','折扣','商人','商戶'], a: '會員享有唔同商戶折扣優惠嫁！有餐廳、診所、律師樓等～問下秘書處就有最新名單啦！' },
    { k: ['法律','律師','律師樓','見工','法律諮詢','法律意見'], a: '我哋有免費法律諮詢服務嫁！如果搵律師，可以問秘书處預約，會員免費啊～' },
    
    /* 活動 */
    { k: ['活動','有咩活動','有咁好','有咩玩','有咩節目','聚會','聯誼','座談會','團拜','春茗'], a: '我哋經常搞活動嫁～花炮會、新春座談會、觀音開庫旅行團、義工頒獎禮等等！留意官網「本會動態」就唔會錯過啦～' },
    { k: ['花炮','炮會','燒炮','炮仗'], a: '花炮會係我哋年度盛事啊！已經搞左三屆，場面好墟撼～燒炮係龍山傳統習俗，夠炮就會好運！' },
    { k: ['觀音開庫','開庫','借庫','祈福','觀音誕'], a: '觀音開庫係顺德千年傳統，已經列入省非遺！我哋每年組團返顺德參與，費用全包～幾好意頭！' },
    { k: ['旅行','旅行團','tour','trip','國內團','省内團'], a: '我哋有唔同主題旅行團嫁～觀音開庫團、花炮會團、龍山美食團咩都有！搵秘书處報名就得啦～' },
    { k: ['義工','志願','志願者','volunteer'], a: '我哋義工團隊好活躍架！如果你想做義工，可以聯繫左擴源副會長～多謝你既心意！' },
    { k: ['敬老','敬老活動','長者','老人家','關愛'], a: '我哋都好重視敬老活動嫁～過年過節都會探訪老會員！多謝你關心啊！' },
    
    /* 聯絡 */
    { k: ['地址','邊度','邊到','邊度姐','邊处','位置','點去','點样去','點樣去','點去'], a: '我哋地址係：香港九龍旺角彌敦道580號恆隆大廈12樓（港鐵旺角站E2出口步行2分鐘）～搵唔到可以call我們！' },
    { k: ['電話','tel','phone','call','聯繫','聯絡','contact','熱線','搵你'], a: '電話/傳真：2770 8156\nWhatsApp：9557 0712（梁美玉秘书）\nEmail：admin@longshan.xin' },
    { k: ['email','電郵','email.address','電郵 address'], a: '電郵地址係：admin@longshan.xin～通常24小時內會回覆你！' },
    { k: ['whatsapp','wa','WeChat','wechat','微信'], a: '你可以whatsapp聯繫我哋秘书：9557 0712（梁美玉妹妹）～平時9-12點回覆最快！' },
    { k: ['office','office hours','辦公','上班','開門','營業','搵人'], a: '辦公시간：星期一至星期五 9:00AM-12:00PM～非辦公時間寫email orWhatsApp就得啦！' },
    
    /* 組織 */
    { k: ['會長','主席','邊個話事','邊個話事姐','會長是邊個'], a: '現任會長係胡國光先生～德高望重，帶領我哋越來越好！副會長有左倩武、賴寶捷、左擴源、陳偉文、何志偉，會務顾问左匯雄。' },
    { k: ['副會長','副會主席','副主席','會長'], a: '我哋副會長有：左倩武、賴寶捷、左擴源、陳偉文、何志偉～個個都好有心服務鄉親！' },
    { k: ['會務顾问','會務顧問','顾问','顧問'], a: '會務顧問係左匯雄先生～經驗豐富，經常指導我哋！' },
    { k: ['組織架構','架构','結構','邊個做咩','邊個負責'], a: '架構：會長1人、副會長5人、理事N人、秘书處～具体分工可以問秘书！' },
    { k: ['有多少人','幾多人','會員人數','人數','幾多人入左','會員幾多'], a: '我哋會員已經遍布全球啦～具體數字要問秘书處，不過肯定過千人！' },
    { k: ['邊個','搵邊個','邊個負責'], a: '你想搵邊位呢？會長胡國光、各位副會長、或者可以搵秘书處～話我知想搵邊個！' },
    
    /* 龍山 */
    { k: ['龍山','順德','家鄉','故郷','乡','顺德','顺德'], a: '龍山係顺德有名既古鎮！有800年歷史，喺顺德杏坛北面～因為燒花炮所以叫「龍山」！我哋鄉親遍布全球，但根永远喺顺德！' },
    { k: ['顺德','順德','顺得','順德'], a: '順德係佛山五區之一，我哋龍山就喺顺德杏坛！有雙軌Loyer父子祠堂、觀音閣、觀音開庫等傳統～歡迎返顺德睇下！' },
    { k: ['燒炮','燒炮','炮','放炮','放炮仗','舞炮'], a: '龍山燒炮係非遺啊！每年觀音開庫就會有炮會，炮到誰家就會好運！' },
    { k: ['祠堂','大宗祠','左氏','左氏祠堂','祖祠'], a: '龍山有間好靚既左半山祠堂！建於清代，雕刻精緻~有歷史價值！' },
    
    /* 官網相關 */
    { k: ['網頁','網站','website','官網','website','web','頁面'], a: '歡迎visit我哋官網 longshan.xin～所有活動資訊、申請表格都可以download！' },
    { k: ['download','下載','表格','申請表','form'], a: '申請表可以喺官網「入會申請」頁面download～填完帶過秘书處就得！' },
    { k: ['公會','協會','社團','同鄉會'], a: '我哋係「順德龍山同鄉會」，1985年成立既非營利社團，聯繫全球龍山鄉親！' },
    
    /* 私隱 */
    { k: ['私隱','隱私','私穩','privacy','個人資料','資料'], a: '我哋嚴格遵守香港私隱條例！所有資料絕對保密，呢你可以放心～詳細可以睇官網「私隱政策」！' },
    
    /* 見面 */
    { k: ['你好','hi','hello','hey','hi ya','早晨','早安','晚安','喂','嗨'], a: '早晨！我係龍仔～有咩想問就問啦，我會盡力幫你！' },
    { k: ['thank','多謝','thank you','thanks','唔該','唔該晒','thx'], a: '唔洗客氣～有咩隨時問我！' },
    { k: ['再見','byebye','拜拜','再會','聽日見','聽日'], a: '再見！記得轉頭再揾我～' },
    { k: ['good','好野','野','OK','ok','好','幾好'], a: '多謝支持！我哋會繼續努力嫁～' },
    { k: ['有咩問題','有問題','問野','問嘢','可以問'], a: '你可以問我任何關於同鄉會既問題～入會、活動、聯絡方式等都得！' },
    { k: ['搵唔到','搵唔到','搵唔到','not found','404'], a: '搵唔到？你可以試下其他頁面，或者直接whatsapp秘书處9557 0712～' },
    { k: ['help','幫手','幫我','help me','幫助'], a: '想問咩呀？入會？活動？聯絡？我可以幫你！' },
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
    row.style.cssText = 'display:flex;margin-bottom:12px;' + (who === 'user' ? 'justify-content:flex-end;' : 'justify-content:flex-start;');
    var b = document.createElement('div');
    b.style.cssText = who === 'user'
      ? 'background:linear-gradient(135deg,#C8102E,#E8304A);color:#fff;border-radius:18px 18px 4px 18px;padding:12px 16px;max-width:85%;font-size:15px;line-height:1.5;box-shadow:0 2px 8px rgba(200,16,46,0.3);font-family:"Noto Sans TC",sans-serif;'
      : 'background:#fff;color:#333;border:1px solid #e8e8e8;border-radius:18px 18px 18px 4px;padding:12px 16px;max-width:85%;font-size:15px;line-height:1.5;box-shadow:0 2px 6px rgba(0,0,0,0.08);font-family:"Noto Sans TC",sans-serif;';
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
    row.style.cssText = 'display:flex;justify-content:flex-start;margin-bottom:12px;';
    row.innerHTML = '<div style="background:#fff;color:#999;border:1px solid #e8e8e8;border-radius:18px 18px 18px 4px;padding:12px 16px;font-size:14px;">緊係緊係緊係...</div>';
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
        temperature: 0.7,
        max_tokens: 200,
        stream: false
      })
    });
    if (!r.ok) throw new Error(r.status);
    var d = await r.json();
    return (d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content || '').trim();
  }

  function fallback() {
    return '我未聽過呢個問題...你可以打電話2770 8156或者whatsapp 9557 0712問秘书處啊～';
  }

  window.toggleChat = function () {
    var p = document.getElementById('chatbot-panel');
    var ic = document.getElementById('chat-btn-icon');
    if (!p || !ic) return;
    var isHidden = p.style.display === 'none' || !p.style.display;
    p.style.display = isHidden ? 'flex' : 'none';
    ic.className = isHidden ? 'fas fa-times text-lg' : 'fas fa-comments text-lg';
    if (isHidden) document.getElementById('chatbot-input').fill();
  };

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('chatbot-form');
    if (!form) return;
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var inp = document.getElementById('chatbot-input');
      if (!inp) return;
      var msg = inp.value.trim();
      if (!msg) return;
      addMsg(msg, 'user');
      inp.value = '';

      var kw = kwMatch(msg);
      if (kw) { addMsg(kw, 'bot'); return; }

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