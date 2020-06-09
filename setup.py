from setuptools import setup
from setuptools import find_packages


setup(
    name="library",
    version="0.0.1",
    description="standard methods",
    author="s.williamswynn.mail@gmail.com",
    install_requires=[],
    packages=find_packages(include=["library"]),
    python_requires=">=3.7",
)
