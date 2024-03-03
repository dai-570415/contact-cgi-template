// 実行ファイル
$(function () {
    // 都道府県を出力する
    prefecturesFunc();

    // バリデーション
    validateFunc();
});

// ふわっと要素を出力する関数
const showElementAnimation = () => {
    const element = $('.bottomSlidein');

    if (!element.length) return;

    const showTiming = $(window).height() > 768 ? 200 : 40;
    const scrollY = $(window).scrollTop();
    const windowH = $(window).height();

    element.each(function () {
        const elemClientRect = this.getBoundingClientRect();
        const elemY = scrollY + elemClientRect.top;

        if (scrollY + windowH - showTiming > elemY) {
            $(this).addClass('is-show');
        } else if (scrollY + windowH < elemY) {
            $(this).removeClass('is-show');
        }
    });
}

// 内部リンクするとスルーと移動する関数
const smoothScrollFunc = () => {
    const $body = $('body,html');
 
    $('a[href^="#"]').on('click', function(e) {
        const $header = $('.header');
        const buffer = 0;
        
        if ($header.length){
            buffer += $header.innerHeight();
        }
        
        const speed = 400;
        const href = $(this).attr('href');
        const target = $(href == '#' || href == '' ? 'html' : href);
        const position = Math.floor(target.offset().top - buffer);
        
        smoothScroll(target, position, speed, buffer, 0);
        return false;
    });

    function smoothScroll(target, position, speed, buffer, count){
        count++;
        if (count > 9 ) return false;
    
        $body.animate({ scrollTop: position }, speed, 'swing', function(){
            const dest = Math.floor(target.offset().top - buffer);
            if(dest == position){
                return true;
            } else {
                smoothScroll(target, dest, 0, buffer, count);
            }
        });
    }
}

// 都道府県を地域別に分けて出力する
const prefecturesFunc = () => {
    const regions = {
        '北海道': [ "北海道" ],
        '東北地方': [ "青森県", "秋田県", "岩手県", "山形県", "宮城県", "福島県" ],
        '関東地方': [ "茨城県", "栃木県", "群馬県", "埼玉県", "神奈川県", "千葉県", "東京都" ],
        '中部地方': [ "山梨県", "長野県", "新潟県", "富山県", "石川県", "福井県", "岐阜県", "静岡県", "愛知県" ],
        '近畿地方': [ "三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県" ],
        '中国地方': [ "鳥取県", "島根県", "岡山県", "広島県", "山口県" ],
        '四国地方': [ "徳島県", "香川県", "愛媛県", "高知県" ],
        '九州地方': [ "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県" ],
        '沖縄地方': [ "沖縄県" ]
    };
    const $prefecturesSelect = $('#prefectures');
    $.each(regions, function(region, prefectures) {
        const $optgroup = $('<optgroup>', { label: region });
        $.each(prefectures, function(index, value) {
            $optgroup.append($('<option>', {
                value: value,
                text: value
            }));
        });
        $prefecturesSelect.append($optgroup);
    });
}


// モーダルウィンドウ
const modalFunc = () => {
    let open = $('.modalOpen'),
    close = $('.modalClose'),
    container = $('.modalContainer');

    open.on('click',function(){	
        container.addClass('active');
        return false;
    });

    close.on('click',function(){	
        container.removeClass('active');
    });

    $(document).on('click',function(e) {
        if(!$(e.target).closest('.modalBody').length) {
            container.removeClass('active');
        }
    });
}

const validateFunc = () => {
    $('form').validate({
        rules: {
            fullname: { required: true },
            furigananame: { required: true },
            email: {
                required: true, 
                email: true,
            },
            emailConf: {
                required: true,
                equalTo: '#email',
            },
            tel: {
                required: true,
                phoneJP: true,
            },
            prefectures: {
                required: true,
                notEqual: ""
            },
            municipalities:  { required: true },
        },
        messages: {
            fullname: { required: '入力必須項目です' },
            furigananame: { required: '入力必須項目です' },
            email: {
                required: '入力必須項目です',
                email: '正しいメールアドレス形式ではありません',
            },
            emailConf: {
                required: '入力必須項目です',
                equalTo: 'メールアドレスが一致しません',
            },
            tel: {
                required: '入力必須項目です',
                phoneJP: "正しい電話番号ではありません"
            },
            prefectures: {
                required: "都道府県を選択してください",
                notEqual: "都道府県を選択してください"
            },
            municipalities: { required: '入力必須項目です' },
        }
    });
    // 電話番号カスタムルール
    $.validator.addMethod("phoneJP", function(value, element) {
        return this.optional(element) || /^[0-9]{2,4}-?[0-9]{2,4}-?[0-9]{3,4}$/.test(value);
    }, "正しい電話番号ではありません");
    $.validator.addMethod("notEqual", function(value, element, param) {
        return value !== param;
    }, "この値は無効です");
}