let active_tab = 0;
const active_tab_classes = ['active_tab', 'tab_padding_t_only'];

function toggleTab(index){
    clearActiveTab()
    document.getElementById("tab-" + index).classList.add(...active_tab_classes)

    const sections = document.querySelectorAll('.content-block');
    sections.forEach(section => {
        section.classList.remove('block');
        section.classList.add('hidden');
    });

    const active_section = document.querySelector('#section-' + index)
    active_section.classList.remove('hidden')
    active_section.classList.add('block')

    active_tab = index;
}

function displayAllSections(){
    document.getElementById("tab-" + active_tab).classList.remove(...active_tab_classes)
    active_tab = null

    const sections = document.querySelectorAll('.content-block');
    sections.forEach(section => {
        section.classList.remove('hidden');
        section.classList.add('block');
    });
}

function clearActiveTab(){
    if(active_tab !== null){
        document.getElementById("tab-" + active_tab).classList.remove(...active_tab_classes)
    }
    const sections = document.querySelectorAll('.content-block');
    sections.forEach(section => {
        section.classList.remove('hidden');
        section.classList.add('block');
    });
}

toggleTab(0);