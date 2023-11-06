# This is a sample Python script.
import subprocess


# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.


# def print_hi(name):
#     # Use a breakpoint in the code line below to debug your script.
#     print(f'Hi, {name}')  # Press Ctrl+F8 to toggle the breakpoint.


# Press the green button in the gutter to run the script.
# if __name__ == '__main__':
#     print_hi('PyCharm')

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
# import subprocess
#
#
def start_django_server():
    try:
        # Use subprocess to run the Django server
        process = subprocess.Popen(['python', 'manage.py', 'runserver'], stdout=subprocess.PIPE,
                                   stderr=subprocess.STDOUT, text=True)

        # Print the server output in real-time
        for line in process.stdout:
            print(line, end='')

        # Wait for the process to finish
        process.wait()
    except Exception as e:
        print(f"An error occurred: {e}")


if __name__ == "__main__":
    start_django_server()
