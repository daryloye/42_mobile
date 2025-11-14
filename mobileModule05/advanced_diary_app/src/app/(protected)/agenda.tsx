import { useState } from 'react';
import { ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { EntriesList, timestampToDateString } from '../../components/entriesList';
import { GetEntryModal } from '../../components/getEntryModal';

export default function Agenda() {
  const [selectedDate, setSelectedDate] = useState(timestampToDateString(Date.now()));

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1}}>

      <GetEntryModal />

      <Calendar
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#078dc6ff',
          selectedDayTextColor: '#ffffff',
          todayBackgroundColor: '#100cdfff',
          todayTextColor: '#ffffffff',
          dayTextColor: '#2d4150',
          textDisabledColor: '#dd99ee'
        }}
        onDayPress={day => {
          setSelectedDate(day.dateString);
        }}
        markedDates={{
          [selectedDate]: { selected: true, disableTouchEvent: true }
        }}
      />

        <EntriesList filterDate={selectedDate} />

    </ScrollView>
  )
}
