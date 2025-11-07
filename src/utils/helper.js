import resolveConfig from 'tailwindcss/resolveConfig';

export const tailwindConfig = () => {
  // Tailwind config
  return resolveConfig('./src/css/tailwind.config.js')
}

export const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

export const formatValue = (value) => Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumSignificantDigits: 3,
  notation: 'compact',
}).format(value);

export const formatThousands = (value) => Intl.NumberFormat('en-US', {
  maximumSignificantDigits: 3,
  notation: 'compact',
}).format(value);

// To use in decimal type of inputs (e.g Price)
export const convertToDecimal = (value) => {
  if (value.includes('.')) {
    if (value[(value.length - 1)] === '.') {
      value = (!value || value === '') ? null : value;
      value = isNaN(value) ? 0 : value;
      return value;
    }
    else{
      value = (!value || value === '') ? null : value;
      value = isNaN(value) ? 0 : parseFloat(value);
      return value;
    }
  }
  else {
    value = (!value || value === '') ? null : value;
    value = isNaN(value) ? 0 : Number(value);
    return value;
  }
}

/**
 * 
 * @param {value} value 
 * @returns 0 if input number is null or 0
 */
export const isNullNumber = (value) => {
  if(value === null || value === 0 || !value || value < 0 || isNaN(value)){
    return 0;
  }
  else{
    return value;
  }
}

/**
 * 
 * @param {value} value 
 * @returns empty string if string is null or empty 
 */
export const isNullString = (value) => {
  if(value === null || value === "" || !value){
    return "";
  }
  else{
    return value;
  }
}


/**
 * 
 * @param {value} value 
 * @returns empty false if boolean is null or undefined 
 */
 export const isNullBoolean = (value) => {
  if(value === null || value === "" || value === undefined){
    return false;
  }
  else{
    return value;
  }
}

export const getFileSource = (module, name) => {
  // src={APIURL + "Common/GetImage?type=resourcedescription&&fileName=" + value.resourceDescriptionImage} 
  if(module && name){

  }
}

// Capitalize first letter only
export const capitalizeFirst = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase()
}


// Capitalize first letter of string
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Capitalize each word in string
export const capitalizeWords = (str) => {
  if (!str) return ''
  return str.split(' ').map(word => capitalize(word)).join(' ')
}

// Convert camelCase or snake_case to Title Case
export const toTitleCase = (str) => {
  if (!str) return ''
  return str
    .replace(/([A-Z])/g, ' $1') // camelCase to spaces
    .replace(/[_-]/g, ' ') // snake_case/kebab-case to spaces
    .split(' ')
    .map(word => capitalize(word))
    .join(' ')
    .trim()
}

// Truncate string with ellipsis
export const truncate = (str, length = 50) => {
  if (!str) return ''
  return str.length > length ? str.substring(0, length) + '...' : str
}

// Generate initials from name
export const getInitials = (name) => {
  if (!name) return 'U'
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2)
}

// Format date to readable string
export const formatDate = (date, format = 'default') => {
  if (!date) return 'N/A'
  
  const dateObj = new Date(date)
  if (isNaN(dateObj.getTime())) return 'Invalid Date'
  
  const options = {
    default: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    short: { month: 'short', day: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit' },
    datetime: { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    }
  }
  
  return dateObj.toLocaleDateString('en-US', options[format] || options.default)
}

// Get relative time (e.g., "2 days ago")
export const getRelativeTime = (date) => {
  if (!date) return 'Unknown'
  
  const dateObj = new Date(date)
  if (isNaN(dateObj.getTime())) return 'Invalid Date'
  
  const now = new Date()
  const diffInSeconds = Math.floor((now - dateObj) / 1000)
  
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 }
  ]
  
  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds)
    if (count > 0) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`
    }
  }
  
  return 'Just now'
}

// Check if date is today
export const isToday = (date) => {
  if (!date) return false
  const dateObj = new Date(date)
  const today = new Date()
  return dateObj.toDateString() === today.toDateString()
}

// Check if date is overdue
export const isOverdue = (date) => {
  if (!date) return false
  const dateObj = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return dateObj < today
}

// Get days until date
export const getDaysUntil = (date) => {
  if (!date) return null
  const dateObj = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  dateObj.setHours(0, 0, 0, 0)
  
  const diffTime = dateObj - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return diffDays
}

// Format date for input field (YYYY-MM-DD)
export const formatDateForInput = (date) => {
  if (!date) return ''
  const dateObj = new Date(date)
  if (isNaN(dateObj.getTime())) return ''
  
  return dateObj.toISOString().split('T')[0]
}

// Convert ISO date to India Date & Time
export const toIndiaDateTime = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// Convert ISO date to DD/MM/YYYY format
export const toDDMMYYYY = (isoDate) =>{
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Get the digit of Month from given Date
 * If date string is not valid then return 0
 * @param  {string} dateString The valid date string
 * @return {Number}      The month digit
 */
export const dateMonth = (dateString) => {
    let month = 0;
    if (!isNaN(Date.parse(dateString))) {
        month = new Date(dateString).toLocaleString('default', { month: 'numeric' });
        return month;
    }
    return month;

}

/**
 * Get the Difference of Years between two valid dates
 * @param {Date} endDate - the end date
 * @param {Date} startDate - the start date
 * @return {number} Difference of Years between startDate and endDate
*/
export const yearDifference = (endDate, startDate) => {
    if (!isNaN(Date.parse(startDate)) && !isNaN(Date.parse(endDate))) {
        let sDate = new Date(startDate);
        let eDate = new Date(endDate);
        let yearsDiff = eDate.getFullYear() - sDate.getFullYear();
        return yearsDiff;

    }

}

/**
 * Get the Difference of Months between two valid dates
 * @param {Date} endDate - the end date
 * @param {Date} startDate - the start date
 * @return {number} Difference of Months between startDate and endDate
*/
export const monthDifference = (endDate, startDate, roundUpFractionalMonths) => {
    if (!isNaN(Date.parse(startDate)) && !isNaN(Date.parse(endDate))) {
        let sDate = new Date(startDate);
        let eDate = new Date(endDate);
        let inverse = false;
        if (startDate > endDate) {
            eDate = new Date(startDate);
            sDate = new Date(endDate);
            inverse = true;
        }

        let yearsDifference = yearDifference(eDate,sDate);
        let monthsDifference = eDate.getMonth() - sDate.getMonth();
        let daysDifference = eDate.getDate() - sDate.getDate();
        let monthCorrection = 0;

        //If roundUpFractionalMonths is true, check if an extra month needs to be added from rounding up.
        //The difference is done by ceiling (round up), e.g. 3 months and 1 day will be 4 months.
        if (roundUpFractionalMonths === true && daysDifference > 0) {
            monthCorrection = 1;
        }

        //If the day difference between the 2 months is negative, the last month is not a whole month.
        else if (roundUpFractionalMonths !== true && daysDifference < 0) {
            monthCorrection = -1;
        }
        let months = (inverse ? -1 : 1) * (yearsDifference * 12 + monthsDifference + monthCorrection);

        return months;

    }

}