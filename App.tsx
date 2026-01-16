import React, { useState } from 'react';
import {
  AppRegistry,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert
} from 'react-native';

// 10 PATIENTS DATA
const DATA = [
  {"id":"1","patientName":"John Doe","phone":"+91-9876543210","reason":"Teeth cleaning","timestamp":"Jan 16, 9:30 AM","status":"New","messages":["Need teeth cleaning appointment"]},
  {"id":"2","patientName":"Jane Smith","phone":"+91-9876543211","reason":"Root canal pain","timestamp":"Jan 16, 10:15 AM","status":"New","messages":["Severe tooth pain, urgent"]},
  {"id":"3","patientName":"Raj Patel","phone":"+91-9876543212","reason":"Braces consult","timestamp":"Jan 15, 2:30 PM","status":"In Progress","messages":["Braces treatment inquiry"]},
  {"id":"4","patientName":"Priya Sharma","phone":"+91-9876543213","reason":"Regular checkup","timestamp":"Jan 14, 11:00 AM","status":"Done","messages":["Routine checkup completed"]},
  {"id":"5","patientName":"Amit Kumar","phone":"+91-9876543214","reason":"Tooth extraction","timestamp":"Jan 16, 1:45 PM","status":"New","messages":["Need extraction consultation"]},
  {"id":"6","patientName":"Sita Devi","phone":"+91-9876543215","reason":"Filling needed","timestamp":"Jan 13, 3:20 PM","status":"New","messages":["Cavity filling required"]},
  {"id":"7","patientName":"Ravi Gupta","phone":"+91-9876543216","reason":"Whitening","timestamp":"Jan 12, 4:10 PM","status":"In Progress","messages":["Teeth whitening inquiry"]},
  {"id":"8","patientName":"Neha Reddy","phone":"+91-9876543217","reason":"Wisdom tooth","timestamp":"Jan 15, 5:30 PM","status":"New","messages":["Wisdom tooth pain"]},
  {"id":"9","patientName":"Vikram Singh","phone":"+91-9876543218","reason":"Dental x-ray","timestamp":"Jan 14, 10:45 AM","status":"Done","messages":["X-ray results ready"]},
  {"id":"10","patientName":"Lakshmi Nair","phone":"+91-9876543219","reason":"Emergency","timestamp":"Jan 16, 8:20 AM","status":"New","messages":["Emergency appointment needed"]}
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'New': return '#10B981';
    case 'In Progress': return '#F59E0B'; 
    case 'Done': return '#8B5CF6';
    default: return '#6B7280';
  }
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Inbox');
  const [selectedPatient, setSelectedPatient] = useState(DATA[0]);
  const [summaryText, setSummaryText] = useState('');
  const [selectedOutcome, setSelectedOutcome] = useState('Scheduled');

  // INBOX SCREEN
  if (currentScreen === 'Inbox') {
    const renderItem = ({ item }: { item: any }) => (
      <TouchableOpacity 
        style={styles.item} 
        onPress={() => {
          setSelectedPatient(item);
          setCurrentScreen('Detail');
        }}
        activeOpacity={0.7}
      >
        <View style={styles.content}>
          <Text style={styles.patientName}>{item.patientName}</Text>
          <Text style={styles.reason}>{item.reason}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <View style={[styles.status, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <Text style={styles.header}>🦷 Dental Inbox (10 Patients)</Text>
        <FlatList 
          data={DATA} 
          renderItem={renderItem} 
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
    );
  }

  // DETAIL SCREEN
  if (currentScreen === 'Detail') {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => setCurrentScreen('Inbox')}
        >
          <Text style={styles.backButtonText}>← Back to Inbox</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.patientName}>{selectedPatient.patientName}</Text>
          <Text style={styles.phone}>{selectedPatient.phone}</Text>
          <Text style={styles.reason}>{selectedPatient.reason}</Text>
          <Text style={styles.timestamp}>Created: {selectedPatient.timestamp}</Text>
        </View>

        <View style={styles.messagesCard}>
          <Text style={styles.sectionTitle}>💬 Messages</Text>
          {selectedPatient.messages.map((msg: string, index: number) => (
            <View key={index} style={styles.message}>
              <Text style={styles.messageText}>{msg}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.createSummaryBtn}
          onPress={() => setCurrentScreen('Summary')}
        >
          <Text style={styles.createSummaryText}>📝 Create Summary</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // SUMMARY SCREEN
  if (currentScreen === 'Summary') {
    const saveSummary = () => {
      if (!summaryText.trim()) {
        Alert.alert('❌ Error', 'Please add a summary');
        return;
      }

      Alert.alert(
        '✅ Success!', 
        `Summary saved for ${selectedPatient.patientName}!\nStatus updated to "Done"`,
        [{ text: 'OK', onPress: () => setCurrentScreen('Inbox') }]
      );
    };

    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => setCurrentScreen('Inbox')}
        >
          <Text style={styles.backButtonText}>← Back to Inbox</Text>
        </TouchableOpacity>

        <View style={styles.patientHeader}>
          <Text style={styles.patientName}>{selectedPatient.patientName}</Text>
          <Text style={styles.patientReason}>{selectedPatient.reason}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📝 Call Summary</Text>
          <TextInput
            style={styles.textarea}
            multiline
            numberOfLines={4}
            placeholder="What was discussed? Key points from the call..."
            value={summaryText}
            onChangeText={setSummaryText}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📊 Outcome</Text>
          {['Scheduled', 'Left Voicemail', 'Needs Follow-up', 'Not Interested'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.outcomeBtn, selectedOutcome === option && styles.outcomeBtnSelected]}
              onPress={() => setSelectedOutcome(option)}
            >
              <Text style={[styles.outcomeBtnText, selectedOutcome === option && styles.outcomeBtnTextSelected]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={saveSummary}>
          <Text style={styles.saveBtnText}>💾 Save & Mark Done</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

AppRegistry.registerComponent('main', () => App);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { fontSize: 24, fontWeight: 'bold', color: 'white', backgroundColor: '#10B981', padding: 20, textAlign: 'center' },
  list: { padding: 16, paddingBottom: 20 },
  item: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    alignItems: 'center',
  },
  content: { flex: 1 },
  patientName: { fontSize: 20, fontWeight: 'bold', marginBottom: 4, color: '#1e293b' },
  reason: { fontSize: 16, color: '#64748b', marginBottom: 4 },
  timestamp: { fontSize: 14, color: '#94a3b8' },
  status: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, minWidth: 90, alignItems: 'center' },
  statusText: { color: 'white', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
  backButton: { backgroundColor: '#f1f5f9', padding: 12, borderRadius: 12, margin: 16, alignItems: 'center' },
  backButtonText: { color: '#64748b', fontSize: 16, fontWeight: '600' },
  card: { backgroundColor: 'white', padding: 24, borderRadius: 16, marginBottom: 16, marginHorizontal: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 4 },
  phone: { fontSize: 18, color: '#10B981', marginBottom: 8 },
  messagesCard: { backgroundColor: 'white', padding: 24, borderRadius: 16, marginBottom: 16, marginHorizontal: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 4 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#1e293b' },
  message: { backgroundColor: '#f1f5f9', padding: 12, borderRadius: 12, marginBottom: 8 },
  messageText: { fontSize: 16, color: '#475569' },
  createSummaryBtn: { backgroundColor: '#10B981', padding: 20, borderRadius: 16, alignItems: 'center', marginBottom: 20, marginHorizontal: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 4 },
  createSummaryText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  patientHeader: { backgroundColor: 'white', padding: 24, borderRadius: 16, marginBottom: 16, marginHorizontal: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 4 },
  patientReason: { fontSize: 18, color: '#64748b', marginBottom: 8 },
  textarea: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, padding: 16, fontSize: 16, minHeight: 120, backgroundColor: '#fafbfc', textAlignVertical: 'top', marginHorizontal: 16 },
  outcomeBtn: { backgroundColor: '#f8fafc', padding: 16, borderRadius: 12, marginBottom: 8, borderWidth: 2, borderColor: '#e2e8f0', marginHorizontal: 16 },
  outcomeBtnSelected: { backgroundColor: '#10B981', borderColor: '#059669' },
  outcomeBtnText: { fontSize: 16, color: '#64748b', textAlign: 'center', fontWeight: '500' },
  outcomeBtnTextSelected: { color: 'white', fontWeight: 'bold' },
  saveBtn: { backgroundColor: '#8B5CF6', padding: 20, borderRadius: 16, alignItems: 'center', marginBottom: 20, marginHorizontal: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 4 },
  saveBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});
