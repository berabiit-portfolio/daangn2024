/*
 * copyright (c) 2020-2021 tokiidesu
 * design by tokiidesu
 *
 * version: 2021.0.r01 2021/06/31
 * release date: Sep 2020
 */

/* #################################################### */
/* ##################### Common ####################### */
/* #################################################### */

/* setInitial */
var html = $('html'),
    body = $('body'),
    header = body.find('.header'),
    aside = body.find('.aside'),
    content = body.find('.content'),
    footer = body.find('.footer');

/* setUser */
daangn = {
    role: 'user',
    user: {
        id: "daangn2",
        name: "당근이",
        alret: 2,
        temperature: 37.3,
        sell: 20,
        buy: 3
    },
    location: "독산동"
}

function common() {
    /* check daangn.role */
    if (daangn.role == 'admin' || daangn.role == 'user') body.addClass('logged-in')
    else body.addClass('logged-out');

    /* setProfile */
    var profile = header.find('.profile'),
        profileImg = profile.find('.profile-button img');

    var profileMenu = profile.find('.menu-content'),
        profileMenuImg = profileMenu.find('.account figure > img'),
        profileName = profileMenu.find('.account-meta .name'),
        profileId = profileMenu.find('.account-meta .id');

    var profileTemp = profileMenu.find('.manner-temp'),
        profileTempLabel = profileTemp.find('.progress .label'),
        profileTempBar = profileTemp.find('.progress-bar'),
        profileTempWidth = (Math.floor((daangn.user.temperature / 60) * 1000)) / 10;

    var profileSell = profileMenu.find('.stuff .sell > .num'),
        profileBuy = profileMenu.find('.stuff .buy > .num');
    
    // setProfileInfo
    profileName.text(daangn.user.name).attr('title', daangn.user.name);
    profileId.text('@' + daangn.user.id).attr('title', daangn.user.id);
    profileImg.attr('srcset', "/daangn2024/images/profile/" + daangn.user.id + "_50.jpg 1x, /daangn2024/images/profile/" + daangn.user.id + "_100.jpg 2x, /daangn2024/images/profile/" + daangn.user.id + ".jpg 3x").attr('src', "/daangn2024/images/profile/" + daangn.user.id + ".jpg");
    profileMenuImg.attr('srcset', "/daangn2024/images/profile/" + daangn.user.id + "_50.jpg 1x, /daangn2024/images/profile/" + daangn.user.id + "_100.jpg 2x, /daangn2024/images/profile/" + daangn.user.id + ".jpg 3x").attr('src', "/daangn2024/images/profile/" + daangn.user.id + ".jpg");

    // setProfileImage
    profileTempLabel.text(daangn.user.temperature + '°C').css('width', profileTempWidth + '%');
    profileSell.text(daangn.user.sell);
    profileBuy.text(daangn.user.buy);

    if (daangn.user.alret > 0) header.find('.alret-button').addClass('new');

    // setMypageProfile
    var mypage = content.find('.seed-section.daangn-mypage'),
        mypageName = mypage.find('.profile-meta .name'),
        mypageId = mypage.find('.profile-meta .id'),
        mypageImg = mypage.find('header figure > img');

    mypageName.text(daangn.user.name).attr('title', daangn.user.name);
    mypageId.text('@' + daangn.user.id).attr('title', daangn.user.id);
    mypageImg.attr('srcset', "/daangn2024/images/profile/" + daangn.user.id + "_50.jpg 1x, /daangn2024/images/profile/" + daangn.user.id + "_100.jpg 2x, /daangn2024/images/profile/" + daangn.user.id + ".jpg 3x").attr('src', "/daangn2024/images/profile/" + daangn.user.id + ".jpg");

    /* setUserTemp() */
    var userTempCheck = false;

    function setUserTemp() {
        profileTempBar.css('--percent', profileTempWidth + '%');
        userTempCheck = true;
    }

    /* resetUserTemp() */
    function resetUserTemp() {
        profileTempBar.css('--percent', '0%');
        userTempCheck = false;
    }

    /* searchMenuOpen() */
    var search = header.find('.search'),
        searchButton = header.find('.search-button'),
        searchCloseButton = header.find('.search-close-button'),
        searchInput = search.find('input'),
        searchList = search.find('.seed-listbox');

    function searchMenuOpen() {
        body.addClass('search-is-open');

        search.attr('aria-expanded', 'true');
        searchInput.attr('aria-expanded', 'true');
        searchList.removeAttr('hidden');

        setTimeout(() => {
            search.addClass('is-open');
        });
    }

    /* searchMenuClose() */
    function searchMenuClose() {
        body.removeClass('search-is-open');

        search.removeClass('is-open').attr('aria-expanded', 'false');
        searchInput.attr('aria-expanded', 'false');
        searchList.prop('hidden', true);
    }

    /* menuOpen() */
    var menuButton = $('.menu-button'),
        menuCloseButton = $('.menu-close-button'),
        menuContent = $('.menu-content'),
        thisMenu,
        thisMenuButton,
        thisMenuContent,
        menuOpenCheck = false;

    function menuOpen() {
        body.addClass('menu-is-open');

        // if thisMenuContent = visible
        thisMenuContent.removeAttr('hidden');
        thisMenuContainer.scrollTop(0);

        setTimeout(() => {
            thisMenuContent.addClass('is-open');
            thisMenuButton.attr('aria-expanded', 'true');

            // set profileTemp
            if (thisMenu.hasClass('profile')) setUserTemp();
            menuOpenCheck = true;
        });
    }

    /* menuClose() */
    function menuClose() {
        thisMenuButton.attr('aria-expanded', 'false');
        thisMenuContent.removeClass('is-open').prop('hidden', true);

        // reset profileTemp
        if (userTempCheck) resetUserTemp();
        menuOpenCheck = false;
    }

    /* menuCloseAll() */
    function menuCloseAll() {
        body.removeClass('menu-is-open');

        menuButton.attr('aria-expanded', 'false');
        menuContent.removeClass('is-open').prop('hidden', true);

        // reset profileTemp
        if (userTempCheck) resetUserTemp();
        menuOpenCheck = false;
    }

    /* daangnTheme() */
    var themeSwitch = header.find('.theme-button .seed-switch');
    
    function daangnTheme() {
        if(themeSwitch.is(":checked")) {
            // theme = dark
            body.attr('data-color-scheme', 'dark')
        } else {
            // theme = light
            body.attr('data-color-scheme', 'light');
        }
    }

    /* daangnTypeFillter() */
    var categoryList = $('.daangn-category .category-list'),
        categoryItem = categoryList.find('> a'),
        thisCategoryItem,
        thisCategoryItemType,
        articleList,
        articleItem,
        thisArticleItem,
        thisArticleItemType;

    var articleItemLabel,
        thisArticleLabel,
        thisArticleLabelType;

    // 필터가 필요한 페이지 인식(karrot-market, karrot-life)
    if (body.attr('data-page') == 'daangn') {
        articleList = $('.daangn-market .article-list');
        articleItem = articleList.find('.article-item');
        articleItemLabel = articleItem.find('footer .seed-label');
    } else if (body.attr('data-page') == 'life') {
        articleList = $('.daangn-life .article-list');
        articleItem = articleList.find('.article-item');
        articleItemLabel = articleItem.find('header .seed-label');
    }

    function daangnTypeFillter() {
        // 실제 사용 시 서버 단계에서 불러 올 것
        // data-type를 체크하여 categoryItem에 selected 클래스 부여
        categoryItem.removeClass('selected').removeAttr('aria-current');

        // data-type를 체크하여 articleItem의 Display 상태 변경
        thisCategoryItem.addClass('selected').attr('aria-current', 'page');
        thisCategoryItemType = thisCategoryItem.data('filter');

        if (thisCategoryItemType == '전체보기') {
            articleList.removeClass('is-filter');

            // data-type = all
            articleItem.removeAttr('hidden');
        } else {
            articleList.addClass('is-filter');

            // data-type = digital, electronics, etc...
            articleItem.each(function() {
                thisArticleItem = $(this);
                thisArticleItemType = thisArticleItem.data('type')
    
                thisArticleItem.removeAttr('hidden');
                if (thisArticleItemType != thisCategoryItemType) thisArticleItem.prop('hidden', true);
            });
        }
    }

    function daangnTypeLabelFillter() {
        categoryItem.removeClass('selected').removeAttr('aria-current');

        thisArticleLabelType = thisArticleLabel.data('filter');

        if (thisArticleLabelType == '전체보기') {
            articleList.removeClass('is-filter');
            articleItem.removeAttr('hidden');
        } else {
            articleList.addClass('is-filter');

            categoryItem.each(function() {
                thisCategoryItem = $(this);
                thisCategoryItemType = thisCategoryItem.data('filter');

                if (thisCategoryItemType == thisArticleLabelType) {
                    thisCategoryItem.addClass('selected').attr('aria-current', 'page');
                }
            });

            articleItem.each(function() {
                thisArticleItem = $(this);
                thisArticleItemType = thisArticleItem.data('type')
    
                thisArticleItem.removeAttr('hidden');
                if (thisArticleItemType != thisArticleLabelType) thisArticleItem.prop('hidden', true);
            });
        }
    }

    /* searchInput.click */
    searchInput.click(function() {
        searchMenuOpen();
    });

    /* searchButton.click */
    searchButton.click(function() {
        searchMenuOpen();

        setTimeout(() => {
            searchInput.focus();
        }, 300);
    });

    /* searchCloseButton.click */
    searchCloseButton.click(function() {
        search.removeClass('is-open');

        // searchListAnimation After Close
        setTimeout(() => {
            body.removeClass('search-is-open');
            searchMenuClose();
        }, 300);
    });
    
    /* menuButton.click */
    menuButton.click(function() {
        // set variable
        thisMenu = $(this).parent('.menu');
        thisMenuButton = $(this);
        thisMenuContent = $(this).next('.menu-content');
        thisMenuContainer = thisMenuContent.find('.menu-container');

        // if thisMenuContent = visible
        if (thisMenuButton.attr('aria-expanded') == 'false') {
            if (menuOpenCheck) menuCloseAll();
            menuOpen();
        } else {
            body.removeClass('menu-is-open');
            menuClose();
        }
    });

    /* menuCloseButton.click */
    menuCloseButton.click(function() {
        thisMenuContent.removeClass('is-open');

        // menuAnimation After Close
        setTimeout(() => {
            body.removeClass('menu-is-open');
            menuClose();
        }, 300);
    });

    /* themeSwitch.click() */
    themeSwitch.click(function() {
        daangnTheme();
    });

    /* categoryItem.click() */
    categoryItem.click(function() {
        thisCategoryItem = $(this);

        daangnTypeFillter();
    });

    /* articleItemLabel.click() */
    if (body.attr('data-page') == 'daangn' || body.attr('data-page') == 'life') {
        articleItemLabel.click(function() {
            thisArticleLabel = $(this);

            daangnTypeLabelFillter();
        });
    }
    
    /* document.click */
    $(document).on('click', function(e) {
        // document.click = searchMenuClose
        if (searchInput.attr('aria-expanded') == 'true' && !$(e.target).closest('.search').length && !$(e.target).closest('.search-button').length && !$(e.target).closest('.search .seed-listbox').length) {
            searchMenuClose();
        }

        // document.click = menuClose
        if (menuOpenCheck && !$(e.target).closest('.menu-content').length) {
            menuCloseAll();
        }
    });
}

/* #################################################### */
/* #################### Developer ##################### */
/* #################################################### */
function developer() {
    /* searchEvent */
    $(".search-input > input").keydown(function (e) {
        // if keydown enterKey = alret
        if (e.key == 'Enter') {
            alert('아래 "검색 기록"을 통해 페이지를 이동 할 수 있습니다.');
            return false;
        }
    });

    /* locationSearchEvent */
    $(".location-input").keydown(function (e) {
        // if keydown enterKey = alret
        if (e.key == 'Enter') {
            alert('이 페이지에서는 동작하지 않습니다.');
            return false;
        }
    });

    /* link[disabled] click() */
    $('[aria-disabled]').click(function(e) {
        alert('이 페이지에서는 동작하지 않습니다.');
        return false;
    });
}

/* #################################################### */
/* ##################### Action ####################### */
/* #################################################### */
common();
developer();