import SwiftUI

struct ContentView: View {
    @EnvironmentObject var appState: AppState
    
    var body: some View {
        Group {
            if appState.isParentMode {
                ParentDashboardView()
            } else if appState.selectedStudent == nil {
                StudentPickerView()
            } else {
                StudentHomeView()
            }
        }
    }
}

struct StudentPickerView: View {
    @EnvironmentObject var appState: AppState
    @State private var showingAddStudent = false
    
    var body: some View {
        NavigationStack {
            VStack(spacing: 20) {
                Text("Who's learning today?")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                
                ScrollView {
                    LazyVGrid(columns: [
                        GridItem(.adaptive(minimum: 150, maximum: 200))
                    ], spacing: 20) {
                        ForEach(appState.students) { student in
                            StudentCard(student: student)
                                .onTapGesture {
                                    appState.selectedStudent = student
                                }
                        }
                        
                        AddStudentCard()
                            .onTapGesture {
                                showingAddStudent = true
                            }
                    }
                    .padding()
                }
            }
            .toolbar {
                ToolbarItem(placement: .automatic) {
                    Button {
                        appState.isParentMode = true
                    } label: {
                        Label("Parent Mode", systemImage: "person.2.fill")
                    }
                }
            }
            .sheet(isPresented: $showingAddStudent) {
                AddStudentView()
            }
        }
    }
}

struct StudentCard: View {
    let student: Student
    
    var body: some View {
        VStack {
            Circle()
                .fill(student.avatarColor)
                .frame(width: 80, height: 80)
                .overlay {
                    Text(String(student.name.prefix(1)))
                        .font(.system(size: 40, weight: .bold))
                        .foregroundColor(.white)
                }
            
            Text(student.name)
                .font(.headline)
            
            Text(student.gradeLevel.displayName)
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .padding()
        .frame(maxWidth: .infinity)
        .background(Color.gray.opacity(0.1))
        .cornerRadius(12)
    }
}

struct AddStudentCard: View {
    var body: some View {
        VStack {
            Circle()
                .strokeBorder(style: StrokeStyle(lineWidth: 2, dash: [8]))
                .frame(width: 80, height: 80)
                .overlay {
                    Image(systemName: "plus")
                        .font(.system(size: 30))
                        .foregroundColor(.secondary)
                }
            
            Text("Add Student")
                .font(.headline)
                .foregroundColor(.secondary)
        }
        .padding()
        .frame(maxWidth: .infinity)
        .background(Color.gray.opacity(0.05))
        .cornerRadius(12)
    }
}

struct AddStudentView: View {
    @Environment(\.dismiss) var dismiss
    @EnvironmentObject var appState: AppState
    
    @State private var name = ""
    @State private var selectedGrade: GradeLevel = .first
    @State private var selectedColor: Color = .blue
    
    let colors: [Color] = [.blue, .green, .orange, .purple, .pink, .red, .yellow]
    
    var body: some View {
        NavigationStack {
            Form {
                Section("Student Info") {
                    TextField("Name", text: $name)
                    
                    Picker("Grade Level", selection: $selectedGrade) {
                        ForEach(GradeLevel.allCases, id: \.self) { grade in
                            Text(grade.displayName).tag(grade)
                        }
                    }
                }
                
                Section("Avatar Color") {
                    HStack {
                        ForEach(colors, id: \.self) { color in
                            Circle()
                                .fill(color)
                                .frame(width: 40, height: 40)
                                .overlay {
                                    if color == selectedColor {
                                        Image(systemName: "checkmark")
                                            .foregroundColor(.white)
                                            .font(.system(size: 16, weight: .bold))
                                    }
                                }
                                .onTapGesture {
                                    selectedColor = color
                                }
                        }
                    }
                }
            }
            .navigationTitle("Add Student")
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Add") {
                        let newStudent = Student(
                            name: name,
                            gradeLevel: selectedGrade,
                            avatarColor: selectedColor
                        )
                        appState.addStudent(newStudent)
                        dismiss()
                    }
                    .disabled(name.isEmpty)
                }
            }
        }
    }
}

#Preview {
    ContentView()
        .environmentObject(AppState())
}
