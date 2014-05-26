page_unique_story_ids = [];
current_fb_seen_ids = [];

//initialize local storage variables
chrome.storage.sync.get('fb-no-repeat', function(result) {
    if (!result['fb-no-repeat']) {
        chrome.storage.sync.set({'fb-no-repeat':[]})
        current_fb_seen_ids = {}
    } else {
        current_fb_seen_ids = result['fb-no-repeat']
    }
});

window.onscroll = function (e) {  
    chrome.storage.sync.get('fb-no-repeat', function(result) {
        current_fb_seen_ids = result['fb-no-repeat'];     
        $('div[data-dedupekey]').each(function() {
            unique_story_json_info = JSON.parse($(this).attr('data-ft'))['mf_story_key']
            xif (unique_story_json_info in current_fb_seen_ids) {
                $(this).hide();
                console.log('Div is hidden because its been indexed')
            }
        });
    });
} 

$('#contentArea').on('mouseover', 'div[data-dedupekey]', function() {
    unique_story_json_info = JSON.parse($(this).attr('data-ft'))['mf_story_key']
    $(this).css('border', '1px solid #69bf69');
    chrome.storage.sync.get('fb-no-repeat', function(result) {
        current_fb_seen_ids = result['fb-no-repeat']; 
        if (!(unique_story_json_info in current_fb_seen_ids)) {
            current_fb_seen_ids[unique_story_json_info] = true
            chrome.storage.sync.set({'fb-no-repeat':current_fb_seen_ids})
            console.log(unique_story_json_info + ' has been added')
        }
    } );
})

//Iterate through page of ids and index them
// alert($('div[data-dedupekey]').length)


//Concatenate array of new seen feed ids with stored ones
// chrome.storage.sync.set({'fb-no-repeat':current_fb_seen_ids.concat(page_unique_story_ids)})


