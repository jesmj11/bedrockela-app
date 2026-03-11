import SwiftUI

@main
struct BedrockELAApp: App {
    @StateObject private var appState = AppState()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(appState)
        }
        #if os(macOS)
        .windowStyle(.hiddenTitleBar)
        .windowToolbarStyle(.unified)
        #endif
    }
}

/// Global app state manager
@MainActor
class AppState: ObservableObject {
    @Published var students: [Student] = []
    @Published var selectedStudent: Student?
    @Published var isParentMode: Bool = false
    
    init() {
        loadStudents()
    }
    
    func loadStudents() {
        // Load from UserDefaults for now
        if let data = UserDefaults.standard.data(forKey: "students"),
           let decoded = try? JSONDecoder().decode([Student].self, from: data) {
            students = decoded
        }
        
        // Create demo student if none exist
        if students.isEmpty {
            let demo = Student(
                name: "Demo Student",
                gradeLevel: .sixth,
                avatarColor: .blue
            )
            students.append(demo)
            saveStudents()
        }
    }
    
    func saveStudents() {
        if let encoded = try? JSONEncoder().encode(students) {
            UserDefaults.standard.set(encoded, forKey: "students")
        }
    }
    
    func addStudent(_ student: Student) {
        students.append(student)
        saveStudents()
    }
    
    func updateStudent(_ student: Student) {
        if let index = students.firstIndex(where: { $0.id == student.id }) {
            students[index] = student
            saveStudents()
        }
    }
    
    func deleteStudent(_ student: Student) {
        students.removeAll { $0.id == student.id }
        if selectedStudent?.id == student.id {
            selectedStudent = students.first
        }
        saveStudents()
    }
}
