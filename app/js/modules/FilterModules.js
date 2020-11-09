export function filterToName(filter) {
    if (filter.includes('popularity')) {
        return 'popular';
    } else if (filter.includes('average')) {
        return 'rated';
    } else {
        return 'today';
    }
}

export function nameToFilter(name) {
    if (name === 'popular') {
        return 'sort_by=popularity.desc';
    } else if (name === 'rated') {
        return 'sort_by=vote_average.desc';
    } else {
        return getReleaseDate();
    }
}

export function getReleaseDate() {
    let today = new Date(),
        day = today.getDate(),
        month = today.getMonth()+1,
        nextMonth = today.getMonth()+2,
        yyyy = today.getFullYear(),
        startDate,
        endDate;

    if(day < 10){
        day='0'+day;
    }

    if(month < 10){
        month='0'+month;
    }

    if(nextMonth < 10){
        nextMonth='0'+nextMonth;
    }

    startDate = `${yyyy}-${month}-${day}`;
    endDate = `${yyyy}-${nextMonth}-${day}`;

    return `primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}`;
}
